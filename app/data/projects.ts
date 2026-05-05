export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  details: string[];
  documents?: Array<{
    label: string;
    url: string;
  }>;
  liveUrl?: string;
  coverImage?: string;
  images?: string[];
  tags: string[];
  gradient: string;
}

export const projects: ProjectItem[] = [
  {
    slug: 'village-hub-ppld',
    title: 'Village Hub PPLD',
    description:
      'ระบบจัดการข้อมูลภายในหมู่บ้านแบบครบวงจร รองรับการจัดการข้อมูลลูกบ้านและบ้าน พร้อมพิกัดแผนที่ และกิจกรรมคูปองลุ้นโชคด้วย QR Code สำหรับชุมชน',
    details: [
      'พัฒนาระบบจัดการข้อมูลหมู่บ้านสำหรับผู้ดูแลและผู้ใช้งานทั่วไป พร้อมการกำหนดสิทธิ์การเข้าถึงตามบทบาท',
      'รองรับการจัดการข้อมูลลูกบ้าน/บ้าน พร้อมพิกัดแผนที่ด้วย Google Maps และแสดงข้อมูลแบบใช้งานจริงในระดับชุมชน',
      'พัฒนาระบบคูปองกิจกรรมพร้อมการสแกน QR Code เพื่อรองรับกิจกรรมตลาดชุมชน'
    ],
    liveUrl: 'https://village-hub-ppld.web.app/',
    coverImage: '/village/home.png',
    images: ['/village/home.png', '/village/houses.png', '/village/houses_map.png', '/village/conpons.png', '/village/conpons_pdf.png'],
    documents: [
      {
        label: 'ไฟล์คูปองกิจกรรม (PDF)',
        url: '/village/coupons.pdf'
      }
    ],
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Google Maps', 'QR Coupon'],
    gradient: 'from-blue-500 to-emerald-500'
  },
  {
    slug: 'flood-report-thailand',
    title: 'Flood Report Thailand',
    description:
      'แพลตฟอร์มรายงานสถานการณ์น้ำท่วมในประเทศไทยแบบเรียลไทม์ ช่วยให้ผู้ใช้งานเข้าถึงข้อมูลพื้นที่เสี่ยงและติดตามสถานการณ์ได้สะดวก',
    details: [
      'พัฒนาแพลตฟอร์มสำหรับติดตามและสื่อสารสถานการณ์น้ำท่วมแบบเรียลไทม์ เพื่อช่วยให้ผู้ใช้งานเข้าถึงข้อมูลได้รวดเร็ว',
      'แสดงผลข้อมูลเชิงพื้นที่ผ่านมุมมองแผนที่ เพื่อให้เห็นจุดเสี่ยงและภาพรวมสถานการณ์ในแต่ละพื้นที่ได้ง่ายขึ้น',
      'ออกแบบหน้าใช้งานให้เข้าถึงได้สะดวกทั้งบนมือถือและเดสก์ท็อป เพื่อรองรับการใช้งานในสถานการณ์เร่งด่วน'
    ],
    liveUrl: 'https://floodreport.in.th/',
    coverImage: '/floodreport/flood-1.png',
    images: [
      '/floodreport/flood-1.png',
      '/floodreport/flood-2.png',
      '/floodreport/flood-3.png',
      '/floodreport/flood-4.png',
      '/floodreport/flood-5.png',
      '/floodreport/flood-6.png'
    ],
    tags: ['Web Application', 'Real-time Data', 'Map'],
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    slug: 'restaurant-pos-southern-thailand',
    title: 'ระบบ POS ร้านอาหาร (ภาคใต้)',
    description:
      'ระบบ POS ร้านอาหารที่พัฒนาครบทั้ง frontend และ backend รองรับ workflow หน้าร้านจริงตั้งแต่การสั่งอาหาร, จัดคิวครัว, ชำระเงิน, ไปจนถึงหน้าจอผู้ดูแลระบบแบบ role-based',
    details: [
      'พัฒนาฝั่งลูกค้า (Guest Flow) ตั้งแต่เลือกเมนู, ตะกร้า, ติดตามออเดอร์, และชำระเงิน พร้อมระบบสมาชิกและการยืนยันตัวตนตามบริบทโต๊ะ',
      'พัฒนาฝั่งแอดมินสำหรับจัดการเมนู, โต๊ะ, ครัว, พนักงาน, ออเดอร์, และการชำระเงิน โดยรองรับการอัปเดตสถานะแบบ real-time',
      'เชื่อมระบบครัวและการชำระเงินด้วย Firestore listeners/SSE เพื่อให้การรับออเดอร์และการอัปเดตสถานะทำงานทันที',
      'พัฒนา backend บน Node.js/Express + Firebase Functions พร้อม Firebase Auth, role claims, และ Swagger API docs สำหรับทดสอบ endpoint',
      'มีโหมดตัวอย่างการใช้งานฝั่งลูกค้า โดยระบบตรวจสอบตำแหน่งตามเงื่อนไข และสามารถทดลองกดเล่น/สั่งอาหารได้ด้วยรหัสพนักงาน 1001'
    ],
    documents: [
      {
        label: 'ตัวอย่างการใช้งานลูกค้า (Guest Demo)',
        url: 'https://warungpos-9e429.web.app/guest/?Id=UTT1cWu772MXhrnORl2kWGion8F3&pid=QLduex0smm'
      }
    ],
    liveUrl: 'https://warungpos-9e429.web.app/',
    coverImage: '/warungpos/warung-4.png',
    images: ['/warungpos/warung-1.png', '/warungpos/warung-2.png', '/warungpos/warung-3.png', '/warungpos/warung-4.png'],
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'Firebase'],
    gradient: 'from-emerald-500 to-cyan-500'
  },
  {
    slug: 'gold-scale-monitoring',
    title: 'เชื่อมต่อเครื่องชั่งทอง (JE4002G)',
    description:
      'เชื่อมต่อเครื่องชั่ง Mettler Toledo (JE4002G) แบบ Web-based ผ่าน Web Serial API สำหรับติดตามน้ำหนักทองแบบเรียลไทม์',
    details: [
      'เชื่อมต่อผ่าน Web Serial API เพื่ออ่านข้อมูลจากเครื่องชั่งโดยตรงไม่ต้องผ่านโปรแกรมตัวกลาง',
      'รองรับโปรโตคอล MT-SICS (Mettler Toledo Standard Interface Command Set) สำหรับการสื่อสารที่แม่นยำ',
      'แสดงผลน้ำหนักแบบ Real-time พร้อมระบบบันทึกค่าที่เสถียร รองรับการทำงานต่อเนื่อง',
      'จัดการระบบ Connection และ Reconnection อัตโนมัติเมื่ออุปกรณ์หลุดหรือเชื่อมต่อใหม่',
      'ออกแบบ UI ให้มีความพรีเมียม สวยงาม และใช้งานง่ายสำหรับผู้ดูแลร้านทอง'
    ],
    coverImage: '/gold/DD861832-9AD0-4EFB-B634-39E456BCAE87.JPG',
    images: [
      '/gold/DD861832-9AD0-4EFB-B634-39E456BCAE87.JPG'
    ],
    tags: ['Next.js', 'TypeScript', 'Web Serial API', 'MT-SICS'],
    gradient: 'from-yellow-500 to-amber-700'
  }
];
