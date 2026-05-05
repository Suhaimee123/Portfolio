'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Custom icons as SVG components
const ScaleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>
  </svg>
);

const WifiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8a15 15 0 0 1 20 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>
  </svg>
);

const WifiOffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h.01"/><path d="M8.5 16.5a5 5 0 0 1 .78-.92"/><path d="M14.72 15.58a5 5 0 0 1 .28.92"/><path d="M5 13a10 10 0 0 1 5.24-2.76"/><path d="M18.76 13a10 10 0 0 0-3-2"/><path d="M2 8a15 15 0 0 1 12.14-3"/><path d="M19.08 11A15 15 0 0 0 22 8"/><line x1="2" x2="22" y1="2" y2="22"/>
  </svg>
);

const ActivityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
);

const SERIAL_FILTERS = [
  { usbVendorId: 0x0EB8 }, // Mettler Toledo Official
  { usbVendorId: 0x0403 }, // FTDI
  { usbVendorId: 0x067B }, // Prolific
  { usbVendorId: 0x1A86 }, // CH340
  { usbVendorId: 0x10C4 }, // Silicon Labs (CP210x)
];

export default function ScaleMonitor() {
  const [weight, setWeight] = useState<string>('0.00');
  const [unit, setUnit] = useState<string>('g');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [status, setStatus] = useState<string>('พร้อมเชื่อมต่อ');
  const [error, setError] = useState<string | null>(null);
  const [isStable, setIsStable] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState({ model: 'Unknown Model', serial: '---' });
  const [mounted, setMounted] = useState(false);
  
  const portRef = useRef<any>(null);
  const readerRef = useRef<any>(null);
  const keepReadingRef = useRef(true);

  useEffect(() => {
    setMounted(true);
    
    const handleDisconnect = (event: any) => {
      if (portRef.current === event.port) {
        disconnect();
        setError('เครื่องชั่งถูกตัดการเชื่อมต่อจากพอร์ต');
      }
    };

    if ('serial' in navigator) {
      (navigator as any).serial.addEventListener('disconnect', handleDisconnect);
      return () => (navigator as any).serial.removeEventListener('disconnect', handleDisconnect);
    }
  }, []);

  const sendCommand = async (command: string) => {
    if (portRef.current && portRef.current.writable) {
      try {
        const writer = portRef.current.writable.getWriter();
        const encoder = new TextEncoder();
        await writer.write(encoder.encode(command + '\r\n'));
        writer.releaseLock();
        
        if (command === 'SIR') setIsStreaming(true);
        if (command === 'S') setIsStreaming(false);
      } catch (err) {
        console.error('Failed to send command:', err);
      }
    }
  };

  const disconnect = useCallback(async () => {
    keepReadingRef.current = false;
    setIsStreaming(false);
    
    if (readerRef.current) {
      await readerRef.current.cancel();
      readerRef.current = null;
    }

    if (portRef.current) {
      try {
        await portRef.current.close();
      } catch (e) {}
      portRef.current = null;
    }

    setIsConnected(false);
    setStatus('ตัดการเชื่อมต่อแล้ว');
    setWeight('0.00');
    setDeviceInfo({ model: 'Unknown Model', serial: '---' });
  }, []);

  const connect = async () => {
    if (!('serial' in navigator)) {
      setError('เบราว์เซอร์ของคุณไม่รองรับ Web Serial API กรุณาใช้ Chrome หรือ Edge');
      return;
    }

    setIsConnecting(true);
    setError(null);
    setStatus('กำลังเลือกพอร์ต...');

    try {
      const port = await (navigator as any).serial.requestPort({
        filters: SERIAL_FILTERS
      }).catch(() => null);

      if (!port) {
        setIsConnecting(false);
        setStatus('ยกเลิกการเลือกพอร์ต');
        return;
      }

      await port.open({ baudRate: 9600 });
      portRef.current = port;
      setIsConnected(true);
      setIsConnecting(false);
      setStatus('เชื่อมต่อสำเร็จ');
      keepReadingRef.current = true;

      // Start discovery and reading
      setTimeout(() => sendCommand('I2'), 500); // Model
      setTimeout(() => sendCommand('I4'), 1000); // Serial
      setTimeout(() => sendCommand('SIR'), 1500); // Stream

      readLoop(port);

    } catch (err: any) {
      console.error(err);
      setError(`ไม่สามารถเชื่อมต่อได้: ${err.message}`);
      setIsConnecting(false);
      setStatus('เกิดข้อผิดพลาด');
    }
  };

  const readLoop = async (port: any) => {
    while (port.readable && keepReadingRef.current) {
      const textDecoder = new (window as any).TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      readerRef.current = textDecoder.readable.getReader();

      try {
        let buffer = '';
        while (true) {
          const { value, done } = await readerRef.current.read();
          if (done) break;
          
          buffer += value;
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() || '';

          for (const line of lines) {
            parseScaleData(line.trim());
          }
        }
      } catch (err) {
        console.error('Read error:', err);
        break;
      } finally {
        readerRef.current.releaseLock();
        try {
          await readableStreamClosed.catch(() => {});
        } catch (e) {}
      }
    }
    
    if (keepReadingRef.current) {
      setIsConnected(false);
      setStatus('อุปกรณ์หลุดการเชื่อมต่อ');
    }
  };

  const parseScaleData = (data: string) => {
    // Discovery responses
    if (data.startsWith('I2')) {
      const model = data.match(/"([^"]+)"/);
      if (model) setDeviceInfo(prev => ({ ...prev, model: model[1] }));
      return;
    }
    if (data.startsWith('I4')) {
      const serial = data.match(/"([^"]+)"/);
      if (serial) setDeviceInfo(prev => ({ ...prev, serial: serial[1] }));
      return;
    }

    // Weight responses
    const isStableValue = data.startsWith('S S');
    setIsStable(isStableValue);
    
    const weightMatch = data.match(/[-+]?\d*\.\d+|\d+/);
    const unitMatch = data.match(/(g|ct|kg|oz|lb)/);
    
    if (weightMatch) setWeight(parseFloat(weightMatch[0]).toFixed(2));
    if (unitMatch) setUnit(unitMatch[1]);
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  if (!mounted) {
    return (
      <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/40 p-8 min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/10 border-t-yellow-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-xl p-8 md:p-10 overflow-hidden relative group">
      {/* Dynamic Background Glow */}
      <div className={`absolute -top-48 -right-48 w-96 h-96 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 ${
        isConnected ? (isStable ? 'bg-emerald-500/10' : 'bg-blue-500/10') : 'bg-yellow-500/5'
      }`} />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 rounded-2xl ${isConnected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'} shadow-lg border border-white/5`}>
                <ScaleIcon />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">MT-SICS <span className="text-yellow-500 text-sm font-bold bg-yellow-500/10 px-2 py-0.5 rounded ml-1 tracking-widest not-italic">PRO</span></h3>
                <p className="text-zinc-500 text-[10px] font-black tracking-widest uppercase mt-1">Industrial Precision Interface</p>
              </div>
            </div>
            <p className="text-zinc-400 text-xs flex items-center gap-2 font-medium">
              {isConnected ? (
                <span className="flex items-center gap-2 text-emerald-400">
                  <WifiIcon /> System Online • {status}
                </span>
              ) : (
                <span className="flex items-center gap-2 text-zinc-600">
                  <WifiOffIcon /> {status}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {isConnected ? (
              <button
                onClick={disconnect}
                className="px-6 py-3 rounded-2xl font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all active:scale-95 text-sm"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="px-8 py-3.5 rounded-2xl font-black bg-yellow-500 text-black hover:bg-yellow-400 active:scale-95 transition-all shadow-xl shadow-yellow-500/20 disabled:opacity-50 text-sm uppercase tracking-widest"
              >
                {isConnecting ? 'Searching...' : 'Scan Balance'}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Weight Section */}
          <div className="lg:col-span-8">
            <div className="bg-[#050505]/60 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden group/weight">
              {/* Reading Progress Line */}
              <div className={`absolute top-0 left-0 h-1 transition-all duration-500 ${isStable ? 'bg-emerald-500 w-full shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-blue-500 w-1/2 animate-shimmer'}`} />
              
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isStable ? 'bg-emerald-500' : 'bg-blue-500 animate-ping'}`} />
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isStable ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {isStable ? 'Signal Stable' : 'Reading Sensor...'}
                </span>
              </div>

              <div className="flex items-baseline gap-6 mt-8">
                <div className={`text-8xl md:text-9xl font-black tracking-tighter tabular-nums transition-all duration-500 ${isStable ? 'text-white' : 'text-blue-400 weight-glow'}`}>
                  {weight}
                </div>
                <div className="text-4xl font-black text-zinc-700 italic select-none">{unit}</div>
              </div>

              {/* Quick Actions */}
              <div className="mt-12 w-full grid grid-cols-4 gap-3">
                <button 
                  onClick={() => sendCommand('Z')}
                  disabled={!isConnected}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all group/btn disabled:opacity-10"
                >
                  <RefreshIcon />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover/btn:text-blue-400">Zero</span>
                </button>
                <button 
                   onClick={() => sendCommand('T')}
                   disabled={!isConnected}
                   className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-orange-500/10 hover:border-orange-500/20 transition-all group/btn disabled:opacity-10"
                >
                  <TrashIcon />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover/btn:text-orange-400">Tare</span>
                </button>
                <button 
                   onClick={() => sendCommand('SIR')}
                   disabled={!isConnected || isStreaming}
                   className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all group/btn disabled:opacity-10"
                >
                  <PlayIcon />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover/btn:text-emerald-400">Live</span>
                </button>
                <button 
                   onClick={() => sendCommand('S')}
                   disabled={!isConnected || !isStreaming}
                   className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-zinc-500/10 hover:border-zinc-500/20 transition-all group/btn disabled:opacity-10"
                >
                  <PauseIcon />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover/btn:text-white">Pause</span>
                </button>
              </div>
            </div>
          </div>

          {/* Device Info Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 border border-white/5 rounded-3xl p-8 relative overflow-hidden">
               <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
               
               <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                 <ActivityIcon /> Hardware Module
               </h4>

               <div className="space-y-6">
                  <div>
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1.5">Model Identity</label>
                    <p className="text-lg font-black text-white tracking-tight">{deviceInfo.model}</p>
                  </div>
                  <div className="pt-5 border-t border-white/5">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1.5">Serial / Security Hash</label>
                    <p className="text-xs font-mono font-bold text-yellow-500 bg-yellow-500/5 px-3 py-2 rounded-xl border border-yellow-500/10 inline-block">
                      {deviceInfo.serial}
                    </p>
                  </div>
                  <div className="pt-5 border-t border-white/5">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Signal Health</span>
                       <span className={`text-[9px] font-bold ${isConnected ? 'text-emerald-400' : 'text-zinc-700'}`}>
                         {isConnected ? 'OPTIMAL' : 'OFFLINE'}
                       </span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full bg-yellow-500 transition-all duration-1000 ${isConnected ? 'w-full' : 'w-0'}`} />
                    </div>
                  </div>
               </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-xs font-medium leading-relaxed">
                <span className="font-black uppercase tracking-widest block mb-1 text-[9px]">System Alert</span>
                {error}
              </div>
            )}

            <div className="bg-[#050505]/40 border border-white/5 rounded-2xl p-6">
              <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                Optimized for Mettler Toledo JE series. Verified 9600-8-N-1 protocol with MT-SICS support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
