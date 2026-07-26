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
  videos?: string[];
  tags: string[];
  gradient: string;
}

export const projects: ProjectItem[] = [
  {
    slug: 'gold-scale-monitoring',
    title: 'CES - Gold Trading & Precision Scale Monitoring System',
    description:
      'ร่วมพัฒนาระบบซื้อขายทองคำ ทั้งฝั่งหน้าบ้าน (React 19) และระบบหลังบ้าน (NestJS + PostgreSQL) พร้อมพัฒนาระบบมอนิเตอร์และบันทึกค่าน้ำหนักจากเครื่องชั่งทองคำอัจฉริยะแบบ Real-time และการโยกย้ายฐานข้อมูล (Data Migration)',
    details: [
      'Frontend Development (React 19): ร่วมพัฒนา UI/UX ระบบซื้อขายและส่งคืนทอง (Gold Return) โดยทำระบบซิงค์ข้อมูลน้ำหนักอัตโนมัติ บังคับชั่งน้ำหนักทอง (Weighing Enforcement) และทำระบบป้อนตัวเลขพร้อมตัวคั่นหลักพันรวมถึงการแสดงผลบน PDF',
      'Backend Services (NestJS & Prisma): ร่วมพัฒนาฟังก์ชันคำนวณและซิงค์ข้อมูลยอดชำระเงินคืนค่ากำเหน็จ (Wage Refund), รายการคืนทองชำรุด (Damaged Stock), และการจัดหมวดหมู่ตัวเลือก SKU อัตโนมัติในระดับฐานข้อมูล',
      'Day-Close Calculation (ระบบปิดยอด): ร่วมวิเคราะห์และแก้ไขตรรกะทางบัญชีในระบบปิดยอดประจำวันเกี่ยวกับค่าแรงช่างทองที่จ่ายหลังงวด/ข้ามงวด และจัดการความคลาดเคลื่อน (Tolerance) ในการชำระบัญชีบางส่วน (Partial Settlement)',
      'Hardware IoT Integration: พัฒนาระบบเชื่อมต่อเครื่องชั่งดิจิทัลระดับอุตสาหกรรม (Mettler Toledo) บนหน้าเบราว์เซอร์ด้วย Web Serial API และเขียนสคริปต์ Python CLI (PySerial) ในการสื่อสารผ่านโปรโตคอลมาตรฐาน MT-SICS',
      'Database Security & Authorization: พัฒนาระบบยืนยันตัวตนระดับผู้จัดการ (Manager Authentication) สำหรับการทำรายการชำระบัญชีข้ามธุรกรรม และป้องกันการยกเลิกรายการชำระบัญชีที่เชื่อมโยงกับธุรกรรมที่มีสถานะ Converted'
    ],
    coverImage: '/gold/DD861832-9AD0-4EFB-B634-39E456BCAE87.JPG',
    images: [
      '/gold/DD861832-9AD0-4EFB-B634-39E456BCAE87.JPG'
    ],
    tags: ['React 19', 'NestJS', 'Web Serial API', 'Python & Pandas', 'Data Migration', 'PostgreSQL & Prisma'],
    gradient: 'from-amber-500 to-yellow-600'
  },
  {
    slug: 'restaurant-pos-southern-thailand',
    title: 'Restaurant POS System (ภาคใต้)',
    description:
      'ระบบ POS ร้านอาหารที่พัฒนาครบทั้ง frontend และ backend (พัฒนาเองคนเดียว) รองรับ workflow หน้าร้านจริงตั้งแต่การสั่งอาหาร, จัดคิวครัว, ชำระเงิน, ไปจนถึงหน้าจอผู้ดูแลระบบ',
    details: [
      'End-to-End POS Workflow: พัฒนาระบบรองรับการทำงานหน้าร้านจริง ครอบคลุมทั้ง Guest Flow (ลูกค้าสแกนโต๊ะสั่งอาหาร, จัดการตะกร้า, จ่ายเงิน พร้อมระบบตรวจสอบตำแหน่ง/บริบทโต๊ะเพื่อความปลอดภัย) และ Admin Flow (ระบบหลังบ้านแบบ Role-based จัดการเมนู โต๊ะ คิวครัว และพนักงาน)',
      'Real-time Operations: เชื่อมต่อระบบหน้าบ้าน, ครัว, และจุดชำระเงินเข้าด้วยกันแบบ Real-time ผ่าน Firestore Listeners ทำให้ออเดอร์และการอัปเดตสถานะทำงานได้ทันที',
      'Backend & API Architecture: วางโครงสร้าง Backend ด้วย Node.js/Express ร่วมกับ Firebase Functions พร้อมระบบยืนยันตัวตนและจัดการสิทธิ์ด้วย Firebase Auth (Role Claims) และเลือกใช้ Bruno เป็นเครื่องมือในการทดสอบและจัดการ API Endpoints เพื่อความรวดเร็วและเป็นมาตรฐานในการทำงาน',
      'Hardware Integration (Plug & Play): พัฒนา Local Print Proxy Service ด้วย Node.js เป็น Middleware แปลงข้อมูลจาก Web POS เป็นคำสั่ง ESC/POS สั่งพิมพ์สลิปและเปิดลิ้นชักผ่าน TCP Socket โดยทำการ Build เป็น Standalone Executable (Windows/macOS) ด้วย pkg พร้อมระบบ Interactive CLI และการจดจำ IP อัจฉริยะ',
      'Data Integrity & Concurrency Control: จัดการปัญหาข้อมูลชนกัน (Race Condition) กรณีลูกค้าและพนักงานใช้งานพร้อมกัน ด้วย Database Transactions และ Locking (Atomic Operations) รวมถึงออกแบบระบบคำนวณแยกชำระเงิน (Split Bill) ที่แม่นยำระดับทศนิยมเพื่อความถูกต้องทางบัญชี'
    ],
    documents: [
      {
        label: 'ตัวอย่างการใช้งานลูกค้า (Guest Demo)',
        url: 'https://warungpos-9e429.web.app/guest/?Id=UTT1cWu772MXhrnORl2kWGion8F3&pid=QLduex0smm'
      }
    ],
    liveUrl: 'https://warungpos-9e429.web.app/',
    coverImage: '/warungpos/warung-4.png',
    images: ['/warungpos/warung-1.png', '/warungpos/warung-2.png', '/warungpos/warung-3.png', '/warungpos/warung-4.png', '/warungpos/IMG_3825.jpg'],
    videos: [
      '/warungpos/3639DC80-987E-4B7A-85D9-7917EB5E6065.mp4',
      '/warungpos/IMG_3828.mp4'
    ],
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'Firebase'],
    gradient: 'from-emerald-500 to-cyan-500'
  },
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
  }
];
