let currentUserRole = 'admin';

function onRoleChange() {
  const roleSelect = document.getElementById('userRoleSelect');
  currentUserRole = roleSelect ? roleSelect.value : 'admin';
  applyRolePermissions();
}

function applyRolePermissions() {
  const saveBtn = document.getElementById('saveBtn');
  if (saveBtn) {
    saveBtn.style.display = (currentUserRole === 'viewer') ? 'none' : 'inline-block';
  }
  renderTable();
}

let records = [
  {"id": 1, "component": "TR_Counter L/A", "code": "T001", "desc": "Counter Lightning Arrester ชำรุด", "cause": "โครงแตก, ซีลเสื่อมสภาพ, กลไกชำรุด", "s": 2, "o": 2, "d": 2, "category": "Economic-minor", "strategy": "Run-to-failure (CM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 2, "component": "TR_OLevelGauge", "code": "T002", "desc": "Oil level gauge ชำรุด", "cause": "โครงแตก, กลไกชำรุด", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 3, "component": "TR_OtempGauge", "code": "T003", "desc": "Oil temp ชำรุด", "cause": "โครงแตก, เสื่อมสภาพ, กลไกชำรุด", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 4, "component": "TR_Sgel/ABreather", "code": "T004", "desc": "Silicagel เปลี่ยนสี / Air Breather ชำรุด", "cause": "Silicagel เสื่อมสภาพ, การอุดตัน / ฝุ่นละออง", "s": 2, "o": 3, "d": 2, "category": "Economic-minor", "strategy": "Run-to-failure (CM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 5, "component": "TR_WTempGauge", "code": "T005", "desc": "Winding temp ชำรุด", "cause": "โครงแตก, เสื่อมสภาพ, กลไกชำรุด", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 6, "component": "TR_TOP", "code": "T006", "desc": "น้ำมันรั่วซึมด้านบนหม้อแปลง", "cause": "ซีลเสื่อมสภาพ", "s": 4, "o": 3, "d": 2, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 7, "component": "TR_Bushing", "code": "T007", "desc": "น้ำมันรั่วซึมที่ Bushing หม้อแปลง", "cause": "ซีลเสื่อมสภาพ, แตกหัก, ติดตั้งไม่ถูกต้องตามมาตราฐาน", "s": 4, "o": 3, "d": 2, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 8, "component": "TR_CableBox", "code": "T008", "desc": "น้ำมันรั่วซึมที่ Cable box", "cause": "ซีลเสื่อมสภาพ, ความร้อนสูงเกินไป", "s": 4, "o": 2, "d": 2, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 9, "component": "TR_Radiator", "code": "T009", "desc": "น้ำมันรั่วซึมที่ Radiator", "cause": "ซีลเสื่อมสภาพ, แรงดันภายในสูง", "s": 4, "o": 2, "d": 2, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 10, "component": "TR_MainTank", "code": "T012", "desc": "น้ำมันหม้อแปลงต่ำ", "cause": "ระบบระบายความร้อนผิดปกติ, ซีลเสื่อม", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 11, "component": "TR_MainTank", "code": "T015", "desc": "หม้อแปลงชำรุด", "cause": "การรั่วซึม, ลัดวงจร, ความร้อนสะสม", "s": 5, "o": 1, "d": 1, "category": "Safety-critical", "strategy": "Redesign บังคับ / Scheduled Discard", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 12, "component": "TR_Trip", "code": "T016", "desc": "หม้อแปลง Trip", "cause": "รีเลย์ทำงานผิดพลาด", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 13, "component": "TR_FAN", "code": "T018", "desc": "เปลี่ยนพัดลมหม้อแปลง", "cause": "สึกหรอจากการใช้งานนาน", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Time-based (PM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 14, "component": "TR_FAN", "code": "T019", "desc": "พัดลมหม้อแปลงถอดไปซ่อม", "cause": "สึกหรอจากการใช้งานนาน", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Time-based (PM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 15, "component": "TR_FAN", "code": "T020", "desc": "พัดลมหม้อแปลงไม่ทำงาน", "cause": "มอเตอร์เสียหาย", "s": 3, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 16, "component": "TR_Coil", "code": "T023", "desc": "ขดลวดหม้อแปลงชำรุด", "cause": "โอเวอร์โหลด, แรงดันผิดปกติ, ความชื้น", "s": 5, "o": 1, "d": 4, "category": "Safety-critical", "strategy": "Redesign บังคับ / Scheduled Discard", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 17, "component": "TR_Core", "code": "T024", "desc": "แกนเหล็กหม้อแปลงชำรุด", "cause": "ความเครียดจากกระแสไฟฟ้า", "s": 4, "o": 1, "d": 4, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 18, "component": "TR_HVBushing", "code": "T025", "desc": "TR_HVBushing หม้อแปลงชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 19, "component": "TR_MVBushing", "code": "T026", "desc": "TR_MVBushing หม้อแปลงชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 20, "component": "TR_OFFLTAP", "code": "T027", "desc": "OFF LODE TAP หม้อแปลงชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Time-based (PM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 21, "component": "TR_BuchRelay", "code": "T028", "desc": "Buchholz relay ชำรุด", "cause": "ลัดวงจร, อุณหภูมิสูง, กลไกติดขัด", "s": 4, "o": 1, "d": 2, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 22, "component": "TR_PresRelief", "code": "T029", "desc": "Pressure relief ชำรุด", "cause": "แรงดันเกินขีดจำกัด, กลไกติดขัด", "s": 4, "o": 1, "d": 2, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 23, "component": "TR_Control_desk", "code": "T101", "desc": "Control desk tap อ่านไม่ตรง", "cause": "ความชื้น, สิ่งสกปรก", "s": 2, "o": 2, "d": 1, "category": "Economic-minor", "strategy": "Run-to-failure (CM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 24, "component": "TR_Control_Lampdesk", "code": "T102", "desc": "Control desk หลอดขาด", "cause": "เสื่อมสภาพ", "s": 2, "o": 2, "d": 1, "category": "Economic-minor", "strategy": "Run-to-failure (CM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 25, "component": "TR_FanControl", "code": "T103", "desc": "Control พัดลมชำรุด", "cause": "เสื่อมสภาพ", "s": 2, "o": 2, "d": 1, "category": "Economic-minor", "strategy": "Run-to-failure (CM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 26, "component": "TR_Relay", "code": "T104", "desc": "Differential relay ชำรุด", "cause": "CT Malfunction, ตั้งค่าผิด", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 27, "component": "TR_DifRelay", "code": "T105", "desc": "Differential relay เปลี่ยน", "cause": "เสื่อมสภาพ", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 28, "component": "TR_Relay", "code": "T106", "desc": "Tripping relay ชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 29, "component": "TR_TrippingRelay", "code": "T107", "desc": "Tripping relay เปลี่ยน", "cause": "เสื่อมสภาพ", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 30, "component": "TR_CountTap", "code": "T206", "desc": "Counter Tap ไม่ทำงาน", "cause": "กลไกติดขัด, เฟืองชำรุด", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 31, "component": "TR_Microlimit", "code": "T208", "desc": "Micro sw. Lower & upper limit ค้าง", "cause": "กลไกติดขัด", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 32, "component": "TR_OLTC Tap", "code": "T209", "desc": "OLTC เปลี่ยน Tap ทางไฟฟ้าไม่ได้", "cause": "OLTC เปลี่ยน Tap ทางไฟฟ้า ไม่ทำงานจริง", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 33, "component": "TR_OLTC Tap", "code": "T210", "desc": "น้ำมันรั่วซึมที่ฝาบ่อ OLTC", "cause": "ซีลเสื่อมสภาพ", "s": 3, "o": 3, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 34, "component": "TR_OLTC Tap", "code": "T211", "desc": "เปลี่ยน Tap แล้วมีเสียงดัง", "cause": "เสียงดังจากกลไก", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 35, "component": "TR_OLTC Tap", "code": "T212", "desc": "ระดับน้ำมันต่ำที่ OLTC", "cause": "ระดับน้ำมันต่ำ ชีลเสื่อม", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 36, "component": "TR_OLTC_ProRelay", "code": "T215", "desc": "Tap protective relay ชำรุด", "cause": "ความชื้น, ฝุ่น, การกัดกร่อน", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 37, "component": "TR_OLTC_MainContact", "code": "T216", "desc": "Main contact ชำรุด", "cause": "อาร์กบ่อย, กระแสเกิน, น้ำมันเสื่อม", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 38, "component": "TR_OLTC_TransitContact", "code": "T217", "desc": "Transition contact ชำรุด", "cause": "การอาร์กซ้ำซ้อน, สปริงเสียหาย", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 39, "component": "TR_OLTC_Gear", "code": "T218", "desc": "Gear unit ชำรุด", "cause": "สึกหรอ", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 40, "component": "TR_OLTC_Access", "code": "T219", "desc": "OLTC Accessories ชำรุด", "cause": "ชำรุดจากอุปกรณ์ประกอบ", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 41, "component": "TR_OLTC_MotorControlBoard", "code": "T220", "desc": "Motor drive control board ชำรุด", "cause": "แรงดันผิดปกติ, ความชื้น", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 42, "component": "TR_OilFilter", "code": "T301", "desc": "Counter oil filter ทำงานผิดปกติ", "cause": "Sensor เสียหาย, Electrical Noise", "s": 2, "o": 2, "d": 2, "category": "Economic-minor", "strategy": "Run-to-failure (CM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 43, "component": "TR_OilFilter", "code": "T302", "desc": "Motor oil filter หมุนกลับทาง", "cause": "ต่อท่อสลับด้าน (Inlet/Outlet)", "s": 2, "o": 2, "d": 2, "category": "Economic-minor", "strategy": "Run-to-failure (CM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 44, "component": "TR_OilFilter", "code": "T303", "desc": "Oil filter unit มีน้ำมันรั่วซึม", "cause": "ซีลเสื่อมสภาพ", "s": 3, "o": 3, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 45, "component": "TR_OilFilter", "code": "T304", "desc": "Oil filter ไม่ทำงานหลังจากเปลี่ยน Tap", "cause": "ระบบปั๊มน้ำมันหยุดทำงาน", "s": 2, "o": 2, "d": 2, "category": "Economic-minor", "strategy": "Run-to-failure (CM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 46, "component": "TR_OilFilter", "code": "T305", "desc": "Pressure gauge oil filter เสีย", "cause": "แรงดันเกินพิกัด, สกปรกเข้าเกจ", "s": 2, "o": 2, "d": 2, "category": "Economic-minor", "strategy": "Run-to-failure (CM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 47, "component": "HV_ClosingCoil", "code": "H001", "desc": "Closing coil ชำรุด, Mechanism CB ขัดข้อง", "cause": "กลไกติดขัด, เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 48, "component": "HV_Mechnism_CB", "code": "H002", "desc": "Mechanism CB ขัดข้อง", "cause": "ขาดบำรุงรักษา, สปริงหัก", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 49, "component": "HV_PumpMotor_CB", "code": "H003", "desc": "Pump motor ของ CB ไม่ทำงาน", "cause": "ไฟไม่เข้า, Pressure switch เสีย", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 50, "component": "HV_PumpMotor_CB", "code": "H005", "desc": "Pump motor ของ CB ทำงานบ่อย", "cause": "ระบบรั่วซึม, Accumulator เสื่อม", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 51, "component": "HV_SF6LowGas", "code": "H006", "desc": "SF6 low gas", "cause": "แก๊สรั่วซึม, เซนเซอร์เสีย", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 52, "component": "HV_SF6LowGas", "code": "H007", "desc": "SF6 over gas", "cause": "อุณหภูมิสูง, เติมก๊าซเกิน", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 53, "component": "HV_GIS_CB", "code": "H010", "desc": "GIS ชำรุด", "cause": "ประกอบผิดพลาด, Internal Arc", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 54, "component": "HV_GIS_CB_SW", "code": "H011", "desc": "SW ปลด / สับ ไม่ได้", "cause": "กลไกติดขัด, สปริงไม่ทำงาน", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 55, "component": "HV_GIS_CB_Hydraulic", "code": "H012", "desc": "Earthing SW ปลด / สับ ไม่ได้", "cause": "กลไกติดขัด, Control Fault", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 56, "component": "HV_GIS_CB_Hydraulic", "code": "H013", "desc": "Earthing SW ชำรุด", "cause": "กลไกติดขัด, Contact ชำรุด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 57, "component": "HV_GIS_CB_Hydraulic", "code": "H014", "desc": "น้ำมัน Hydraulic รั่วซึม", "cause": "ซีลเสื่อม, ท่อแตก", "s": 4, "o": 2, "d": 2, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 58, "component": "HV_GIS_CB", "code": "H015", "desc": "น้ำมันรั่วซึมที่ Pole ของ CB", "cause": "ซีลเสื่อมสภาพ", "s": 4, "o": 2, "d": 2, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 59, "component": "HV_GIS_CB", "code": "H018", "desc": "CB Main Contact ชำรุด", "cause": "หมดอายุการใช้งาน, กระแสลัดวงจรสูง", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 60, "component": "HV_GIS_CB_ES/DS_MainContact", "code": "H019", "desc": "ES/DS Main Contact ชำรุด", "cause": "หมดอายุการใช้งาน, แรงกดไม่พอ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 61, "component": "HV_GIS_CB_ES/DS_Mechanism", "code": "H020", "desc": "DS/ES Mechanism ชำรุด", "cause": "กลไกติดขัด", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 62, "component": "HV_GIS_CB", "code": "H021", "desc": "Trip coil ชำรุด", "cause": "เสื่อมสภาพ, ความชื้น", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 63, "component": "HV_GIS_CB", "code": "H022", "desc": "แก๊ส SF6 รั่ว", "cause": "แก๊สรั่วซึม", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 64, "component": "HV_GIS_CB", "code": "H023", "desc": "แก๊ส SF6 เสื่อมสภาพ", "cause": "เสื่อมสภาพตามอายุ", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 65, "component": "HV_GIS_CB_SF6PressGage", "code": "H024", "desc": "SF6 Pressure gage ชำรุด", "cause": "เกจปนเปื้อนฝุ่น, ติดตั้งผิด", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 66, "component": "HV_HVSW_CTPT", "code": "H101", "desc": "SW ไม่สามารถ Control ทางไฟฟ้าได้", "cause": "Control Circuit Fault", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 67, "component": "HV_HVSW_CTPT", "code": "H102", "desc": "CT, PT ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 68, "component": "HV_HVSW_CTPT", "code": "H103", "desc": "Flexible conductor ขาดบางส่วน", "cause": "ขาดบางส่วนจากการใช้งาน", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 69, "component": "HV_HVSW_CTPT", "code": "H104", "desc": "Jumper, sleeve ร้อนแดง", "cause": "ร้อนเกินมาตรฐาน", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 70, "component": "HV_HVSW_CTPT", "code": "H105", "desc": "Motor ของ SW ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 71, "component": "HV_HVSW_CTPT", "code": "H107", "desc": "SW โก่ง ร้อนแดง", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 72, "component": "HV_HVSW_CTPT", "code": "H108", "desc": "SW ปลด-สับ ยาก", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 73, "component": "HV_HVSW_CTPT", "code": "H109", "desc": "SW สับไม่สนิท", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 74, "component": "HV_HVSW_CTPT", "code": "H110", "desc": "จุดต่อ Busbar ต่างๆร้อนแดง", "cause": "Hot Spot", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 75, "component": "HV_HVSW_CTPT", "code": "H111", "desc": "มีวัสดุ/รังนกที่ SW", "cause": "มีวัสดุแปลกปลอม", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 76, "component": "HV_HVSW_CTPT", "code": "H112", "desc": "ลูกถ้วยชำรุด", "cause": "ความชื้น, ฝุ่นละออง", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 77, "component": "HV_HVSW_CTPT", "code": "H113", "desc": "ลูกถ้วยมีรอยชำรุด", "cause": "ความชื้น, การกัดกร่อน", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 78, "component": "HV_HVSW_CTPT", "code": "H114", "desc": "สวิตช์ใบมีด ground ปลด / สับ ไม่ได้", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 79, "component": "HV_HVSW_CTPT", "code": "H117", "desc": "DS/ES Mechanism ชำรุด", "cause": "กลไกติดขัด", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 80, "component": "HV_Cap", "code": "H201", "desc": "Capacitor bank ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 81, "component": "HV_Cap", "code": "H202", "desc": "อุปกรณ์ชุดปลด-สับ Capacitor bank ไม่ทำงาน", "cause": "อุปกรณ์ทำงานผิดพลาด", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 82, "component": "HV_ShowReset", "code": "H301", "desc": "Alarm show reset ไม่ได้", "cause": "เสื่อมสภาพ", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 83, "component": "HV_DisRelay", "code": "H305", "desc": "Distance relay ชำรุด", "cause": "CT Malfunction, การตั้งค่าผิด", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 84, "component": "HV_Relay", "code": "H308", "desc": "Overcurrent relay ชำรุด", "cause": "ระบบควบคุมผิดพลาด", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 85, "component": "HV_OCRelay", "code": "H309", "desc": "Overcurrent relay เปลี่ยน", "cause": "เสื่อมสภาพ", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 86, "component": "MV_Relay", "code": "M311", "desc": "ซ่อม Relay เสีย", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 87, "component": "MV_Alarm", "code": "M312", "desc": "สวิตช์ตก alarm ไม่ดัง", "cause": "ระบบควบคุมผิดพลาด", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 88, "component": "HV_Distance", "code": "H313", "desc": "ถอด Distance relay ไว้", "cause": "ระบบควบคุมผิดพลาด", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 89, "component": "HV_SW_LTO", "code": "H314", "desc": "สายส่ง SW ตก LTO ไม่ทำงาน", "cause": "ระบบควบคุมผิดพลาด", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 90, "component": "HV_LampDC", "code": "H315", "desc": "หลอด DC supply show reset ไม่ได้", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 91, "component": "MV_SWGR_CB", "code": "M001", "desc": "CB ปลดไม่ได้", "cause": "กลไกติดขัด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 92, "component": "MV_SWGR_CB_PT", "code": "M002", "desc": "PT ชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 93, "component": "MV_SWGR_CB", "code": "M003", "desc": "GCB low gas", "cause": "แก๊สรั่วซึม", "s": 4, "o": 2, "d": 2, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 94, "component": "MV_SWGR_CB_VacInter", "code": "M004", "desc": "Vacuum interrupter ชำรุด", "cause": "กลไกติดขัด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 95, "component": "MV_SWGR_CB_Heater", "code": "M005", "desc": "Heater ชำรุด", "cause": "กลไกติดขัด", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 96, "component": "MV_SWGR_CB_Mechanism", "code": "M006", "desc": "Mechanism ของ CB ขัดข้อง", "cause": "อุปกรณ์ผิดพลาด", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 97, "component": "MV_SWGR_CB_MotorChargSpring", "code": "M007", "desc": "Motor charge spring ไม่ทำงาน/ทำงานตลอด", "cause": "อุปกรณ์ผิดพลาด", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 98, "component": "MV_SWGR_OCB", "code": "M008", "desc": "OCB มีน้ำมันไหลซึม", "cause": "น้ำมันรั่วซึม", "s": 5, "o": 1, "d": 1, "category": "Safety-critical", "strategy": "Redesign บังคับ / Scheduled Discard", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 99, "component": "MV_SWGR_TR_StationService", "code": "M009", "desc": "Station service / Pad mounted TR น้ำมันรั่วซึม", "cause": "น้ำมันรั่วซึม", "s": 5, "o": 1, "d": 1, "category": "Safety-critical", "strategy": "Redesign บังคับ / Scheduled Discard", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 100, "component": "MV_SWGR_CB", "code": "M010", "desc": "SWGR ระเบิด", "cause": "ไฟฟ้าลัดวงจร (Short Circuit)", "s": 5, "o": 1, "d": 1, "category": "Safety-critical", "strategy": "Redesign บังคับ / Scheduled Discard", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 101, "component": "MV_SWGR_CB", "code": "M011", "desc": "ขณะปลด lock เพื่อ isolate CB สับเข้าเอง", "cause": "กลไกติดขัด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 102, "component": "MV_SWGR_CB", "code": "M012", "desc": "ซ่อม Circuit breaker ชำรุด", "cause": "กลไกชำรุด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 103, "component": "MV_SWGR_CB", "code": "M013", "desc": "นำ CB ออกนอกตู้ไม่ได้", "cause": "อุปกรณ์ทำงานผิดพลาด", "s": 5, "o": 2, "d": 2, "category": "Safety-critical", "strategy": "Redesign บังคับ / Scheduled Discard", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 104, "component": "MV_SWGR_CB", "code": "M014", "desc": "เปลี่ยน SWGR ชำรุด", "cause": "อุปกรณ์ทำงานผิดพลาด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 105, "component": "MV_SWGR_CB", "code": "M015", "desc": "แผง SWGR มีเสียงดังผิดปกติ", "cause": "อุปกรณ์ทำงานผิดพลาด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 106, "component": "MV_SWGR_CB", "code": "M016", "desc": "สวิตช์ตกไม่สับ ทั้ง RR on อยู่", "cause": "กลไกชำรุด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 107, "component": "MV_SWGR_CB", "code": "M017", "desc": "Earthing SW ปลดไม่ได้", "cause": "กลไกชำรุด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 108, "component": "MV_SWGR_CB", "code": "M018", "desc": "Earthing SWชำรุด", "cause": "กลไกชำรุด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 109, "component": "MV_SWGR_TR_StationService", "code": "M021", "desc": "Station service transformer ชำรุด", "cause": "ไฟฟ้าลัดวงจร", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 110, "component": "MV_GIS_CB", "code": "M101", "desc": "CB ขัดข้อง ปลด-สับ ไม่ได้", "cause": "กลไกขัดข้อง", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 111, "component": "MV_GIS_CB", "code": "M102", "desc": "GIS ชำรุด", "cause": "กลไกชำรุด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 112, "component": "MV_GIS_CB", "code": "M103", "desc": "Low gas alarm show reset ไม่ได้", "cause": "เสื่อมสภาพ, ระบบควบคุมผิดพลาด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 113, "component": "MV_GIS_CB", "code": "M104", "desc": "Motor ของ Bus isolate ชำรุด", "cause": "กลไกชำรุด", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 114, "component": "MV_GIS_CB", "code": "M105", "desc": "Motor ของ Bus isolate ถอดไปซ่อมและนำเข้าใช้งาน", "cause": "ถอดซ่อมแซม", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 115, "component": "MV_GIS_CB", "code": "M106", "desc": "Bus isolate ชำรุด", "cause": "ชำรุดเสียหาย", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 116, "component": "MV_GIS_CB", "code": "M107", "desc": "SF6 over gas", "cause": "SF6 over gas", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 117, "component": "MV_GIS_CB", "code": "M108", "desc": "SF6 low gas", "cause": "SF6 low gas", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 118, "component": "MV_Cap_Bushing", "code": "M201", "desc": "Bushing capacitor มีน้ำมันรั่ว", "cause": "น้ำมันรั่วซึม", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 119, "component": "MV_Cap", "code": "M202", "desc": "Capacitor bank ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 120, "component": "MV_Cap_UVRelay", "code": "M203", "desc": "Capacitor bank ปลดออกอัตโนมัติเนื่องจาก", "cause": "ระบบควบคุมผิดพลาด", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 121, "component": "MV_Cap", "code": "M204", "desc": "เปลี่ยน Capacitor ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 122, "component": "MV_Cap", "code": "M205", "desc": "Fuse capacitor bank ขาด", "cause": "ระบบควบคุมผิดพลาด", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 123, "component": "MV_Cap_VacuumSw", "code": "M206", "desc": "Vacuum Sw ปลด-สับไม่ได้", "cause": "กลไกชำรุด", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 124, "component": "MV_Cap", "code": "M207", "desc": "เปลี่ยน Capacitor bank แทนชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 125, "component": "MV_BTO", "code": "M302", "desc": "BTO ไม่ทำงาน", "cause": "เสื่อมสภาพ, ระบบควบคุมผิดพลาด", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 126, "component": "MV_BusDifRelay", "code": "M303", "desc": "Bus differential relay ชำรุด", "cause": "CT Malfunction, ตั้งค่าผิด", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 127, "component": "MV_LBP/CBF", "code": "M304", "desc": "LBP/CBF ทำงาน", "cause": "ระบบควบคุมผิดพลาด", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 128, "component": "MV_Relay", "code": "M306", "desc": "Overcurrent relay ชำรุด", "cause": "CT Malfunction, ตั้งค่าผิด", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 129, "component": "MV_Relay", "code": "M307", "desc": "Overcurrent relay เปลี่ยน", "cause": "เสื่อมสภาพ", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 130, "component": "MV_Relay", "code": "M308", "desc": "Relay เสีย", "cause": "เสื่อมสภาพ", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 131, "component": "MV_Control", "code": "M310", "desc": "ชุด Control relay OC,EF on แล้ว trip", "cause": "เสื่อมสภาพ", "s": 4, "o": 1, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 132, "component": "LV_BatCharger_Trip", "code": "L001", "desc": "Breaker trip ของ AC Source", "cause": "ระบบควบคุมผิดพลาด", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 133, "component": "LV_BatCharger_Trip", "code": "L002", "desc": "Breaker trip ของ DC Rectifier/Load", "cause": "ระบบควบคุมผิดพลาด", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 134, "component": "LV_BatCharger", "code": "L003", "desc": "Charger ชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 135, "component": "LV_Battery", "code": "L004", "desc": "DC Volt ต่ำ/สูงกว่ามาตรฐาน", "cause": "แรงดันไม่ได้มาตรฐาน", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 136, "component": "LV_Battery", "code": "L005", "desc": "ถ.พ.ต่ำ/สูง บาง cell", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 137, "component": "LV_Battery", "code": "L006", "desc": "เปลี่ยน Battery รั่วบาง cell", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 138, "component": "LV_Battery", "code": "L007", "desc": "Case ของ Battery แตกลายงา/เปลี่ยนสี", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 139, "component": "LV_Battery", "code": "L008", "desc": "ระดับน้ำกลั่น ต่ำ / สูง กว่ามาตรฐาน", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 140, "component": "LV_BatCharger", "code": "L011", "desc": "DC ลงกราวน์", "cause": "DC ลงกราวน์", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 141, "component": "LV_BatCharger", "code": "L012", "desc": "Amp. Meter battery charger ชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 142, "component": "LV_BatCharger", "code": "L013", "desc": "Volt. Meter battery charger ชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 143, "component": "LV_Battery", "code": "L014", "desc": "Battery low capacity", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 144, "component": "LV_AC/DCBoard", "code": "L101", "desc": "AC board Breaker ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 145, "component": "LV_AC/DCBoard", "code": "L102", "desc": "DC board Breaker ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 146, "component": "LV_AC/DCBoard", "code": "L103", "desc": "Breaker ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 147, "component": "LV_AC/DCBoard", "code": "L104", "desc": "Breaker สวิทซ์ตกบ่อย", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 148, "component": "LV_AC/DCBoard", "code": "L107", "desc": "วงจร ATF ชำรุดที่ AC Panel", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 149, "component": "LV_Fprotection", "code": "L201", "desc": "Air compressor มีน้ำมันซึม", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 150, "component": "LV_Fprotection", "code": "L202", "desc": "Alarm ที่ตู้ CWS show reset ไม่ได้", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 151, "component": "LV_Fprotection", "code": "L203", "desc": "Alarm ที่ตู้ Fire Control reset ไม่ได้", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 2, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 152, "component": "LV_Fprotection", "code": "L204", "desc": "Nitrogen รั่ว", "cause": "Nitrogen รั่วซึม", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 153, "component": "LV_Fprotection", "code": "L205", "desc": "Air pressure ของชุด Detector ต่ำกว่ามาตรฐาน", "cause": "อุปกรณ์ทำงานผิดพลาด", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 154, "component": "LV_Fprotection", "code": "L206", "desc": "Battery ชุดตู้ Fire control เสื่อมสภาพ", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 155, "component": "LV_Fprotection", "code": "L207", "desc": "Battery ชุดเครื่องยนต์ดับเพลิงเสื่อมสภาพ", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 156, "component": "LV_Fprotection", "code": "L208", "desc": "Priming tank มีสนิมภายในมาก", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 157, "component": "LV_Fprotection", "code": "L209", "desc": "เครื่องยนต์ดับเพลิง start ไม่ติด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 158, "component": "LV_Fprotection", "code": "L210", "desc": "น้ำไม่เข้าถัง Priming tank", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 159, "component": "LV_Fprotection", "code": "L211", "desc": "น้ำที่ Pilot line / น้ำยา Soft drops รั่ว", "cause": "รั่วซึม", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 160, "component": "SCADA_MMI", "code": "S001", "desc": "Measurement ที่หน้าจอ MMI ไม่เปลี่ยน", "cause": "เสื่อมสภาพ, ระบบควบคุมผิดพลาด", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 161, "component": "SCADA_ShowFail", "code": "S002", "desc": "Show Communication fail", "cause": "เสื่อมสภาพ, ระบบควบคุมผิดพลาด", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 162, "component": "SCADA_UPS", "code": "S004", "desc": "UPS / Converter / Inverter ขัดข้อง", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 163, "component": "SCADA_Measure", "code": "S005", "desc": "ค่า measurement อ่านค่าไม่ตรง", "cause": "เสื่อมสภาพ, อุณหภูมิเปลี่ยนแปลง", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 164, "component": "SCADA_MMI", "code": "S006", "desc": "ตำแหน่งอุปกรณ์ที่หน้าแผงและ MMI/SCADA ไม่ตรงกัน", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 165, "component": "SCADA_CB-EF-RR", "code": "S007", "desc": "เรียก menu control CB, EF, RR ไม่ได้", "cause": "ระบบควบคุมผิดพลาด", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 166, "component": "SCADA_FireAlarm", "code": "S101", "desc": "Fire Alarm Zone Show Reset ไม่ได้", "cause": "ระบบควบคุมผิดพลาด", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 167, "component": "SCADA_Control", "code": "S102", "desc": "ตู้ Control ที่ alarm ดังตลอด", "cause": "ระบบควบคุมผิดพลาด", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 168, "component": "Pole/Route บ่อพัก/Cable", "code": "UM01", "desc": "ข้อต่อสายหลวม", "cause": "ติดตั้งไม่ถูกต้อง", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 169, "component": "Pole/Route บ่อพัก/Cable", "code": "UM02", "desc": "เทอร์มิเนเตอร์ซิลิโคนคอมปาวด์รั่ว", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 170, "component": "Pole/Route บ่อพัก/Cable", "code": "UM03", "desc": "ครีบเทอร์มิเนเตอร์แตก", "cause": "เสื่อมสภาพ", "s": 5, "o": 1, "d": 3, "category": "Safety-critical", "strategy": "Redesign บังคับ / Scheduled Discard", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 171, "component": "Pole/Route บ่อพัก/Cable", "code": "UM04", "desc": "เทอร์มิเนเตอร์ระเบิดชำรุด", "cause": "เสื่อมสภาพ", "s": 5, "o": 1, "d": 3, "category": "Safety-critical", "strategy": "Redesign บังคับ / Scheduled Discard", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 172, "component": "Pole/Route บ่อพัก/Cable", "code": "UM05", "desc": "สายกราวด์หาย", "cause": "Non Technical Loss", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 173, "component": "Pole/Route บ่อพัก/Cable", "code": "UM06", "desc": "เปลือกสายเคเบิลแตก", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 174, "component": "Pole/Route บ่อพัก/Cable", "code": "UM07", "desc": "แคมป์ยึดสายเคเบิลแตกชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 175, "component": "Pole/Route บ่อพัก/Cable", "code": "UM08", "desc": "บ่อพักท่อร้อยสายชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 176, "component": "Pole/Route บ่อพัก/Cable", "code": "UM09", "desc": "กระแสกราวด์สูงเกินปกติ", "cause": "ไม่ทราบสาเหตุ", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 177, "component": "Pole/Route บ่อพัก/Cable", "code": "UM10", "desc": "หัวต่อสายฯชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 178, "component": "Pole/Route บ่อพัก/Cable", "code": "UM11", "desc": "เทอร์มิเนเตอร์และหัวต่อสายฯมีอุณหภูมิสูง", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 179, "component": "Pole/Route บ่อพัก/Cable", "code": "UM12", "desc": "เคเบิล 230เควี น้ำมันรั่วซึม", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 180, "component": "Pole/Route บ่อพัก/Cable", "code": "UM13", "desc": "ระบบพัดลมระบายอากาศชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 181, "component": "Pole/Route บ่อพัก/Cable", "code": "UM14", "desc": "PLC ระบบอุโมงค์ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 182, "component": "Pole/Route บ่อพัก/Cable", "code": "UM15", "desc": "ปั๊มน้ำในอุโมงค์ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 183, "component": "Pole/Route บ่อพัก/Cable", "code": "UM16", "desc": "ระบบตรวจวัดอากาศในอุโมงค์ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 184, "component": "Pole/Route บ่อพัก/Cable", "code": "UM17", "desc": "ระบบน้ำเย็นอุโมงค์ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 185, "component": "Pole/Route บ่อพัก/Cable", "code": "UM18", "desc": "ระบบไฟแรงต่ำอุโมงค์ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 186, "component": "Pole/Route บ่อพัก/Cable", "code": "UM19", "desc": "เคเบิลการ์ดชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 187, "component": "Pole/Route บ่อพัก/Cable", "code": "UM20", "desc": "อุปกรณ์ป้องกันเพลิงไหม้ชำรุด", "cause": "เสื่อมสภาพ", "s": 3, "o": 2, "d": 1, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 188, "component": "Pole/Route บ่อพัก/Cable", "code": "UM21", "desc": "สายไฟฟ้าใต้ดินชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 189, "component": "Pole/Route บ่อพัก/Cable", "code": "UM22", "desc": "ปลวกกัดแทะสาย", "cause": "สัตว์หรือแมลงกัดแทะ", "s": 3, "o": 2, "d": 3, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 190, "component": "เสา/สาย", "code": "SM01", "desc": "Crane / Back-Hoe", "cause": "รถและเครื่องจักรบุคคลที่ 3", "s": 5, "o": 2, "d": 1, "category": "ความเสี่ยงบุคคลที่ 3 (Third-party)", "strategy": "มาตรการป้องกันเฉพาะ (ไม่ใช่ PM อุปกรณ์)", "note": "ความเสี่ยงจากบุคคลที่ 3 ต้องมีมาตรการป้องกันแยกต่างหาก", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 191, "component": "เสา/สาย", "code": "SM02", "desc": "ผู้รับเหมาโดนสายส่ง", "cause": "อุบัติเหตุบุคคลที่ 3", "s": 5, "o": 2, "d": 1, "category": "ความเสี่ยงบุคคลที่ 3 (Third-party)", "strategy": "มาตรการป้องกันเฉพาะ (ไม่ใช่ PM อุปกรณ์)", "note": "ความเสี่ยงจากบุคคลที่ 3 ต้องมีมาตรการป้องกันแยกต่างหาก", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 192, "component": "เสา/สาย", "code": "SM03", "desc": "บุคคลโดนสายส่ง", "cause": "อุบัติเหตุบุคคลที่ 3", "s": 5, "o": 2, "d": 1, "category": "ความเสี่ยงบุคคลที่ 3 (Third-party)", "strategy": "มาตรการป้องกันเฉพาะ (ไม่ใช่ PM อุปกรณ์)", "note": "ความเสี่ยงจากบุคคลที่ 3 ต้องมีมาตรการป้องกันแยกต่างหาก", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 193, "component": "เสา/สาย", "code": "SM05", "desc": "งู/นก/สัตว์", "cause": "สัตว์สัมผัสอุปกรณ์", "s": 4, "o": 3, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 194, "component": "เสา/สาย", "code": "SM06", "desc": "ป้ายโฆษณา/สังกะสี", "cause": "ภัยธรรมชาติ/ลมพัด", "s": 4, "o": 3, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 195, "component": "เสา/สาย", "code": "SM07", "desc": "ว่าว/ลูกโป่ง/เศษผ้า", "cause": "ภัยธรรมชาติ", "s": 4, "o": 3, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 196, "component": "เสา/สาย", "code": "SM08", "desc": "Bond wire/ OHGW", "cause": "ภัยธรรมชาติ", "s": 4, "o": 3, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 197, "component": "เสา/สาย", "code": "SM09", "desc": "ต้นไม้/เสา TV", "cause": "ภัยธรรมชาติ", "s": 4, "o": 3, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 198, "component": "เสา/สาย", "code": "SM10", "desc": "เศษวัสดุ", "cause": "ภัยธรรมชาติ", "s": 4, "o": 3, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 199, "component": "เสา/สาย", "code": "SM11", "desc": "Flash Over/Leak", "cause": "Flash Over/Leak", "s": 4, "o": 2, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 200, "component": "เสา/สาย", "code": "SM12", "desc": "ลูกถ้วยหลุด/แตก", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 201, "component": "เสา/สาย", "code": "SM13", "desc": "ฝนตกฟ้าผ่า", "cause": "ภัยธรรมชาติ", "s": 4, "o": 3, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 202, "component": "เสา/สาย", "code": "SM14", "desc": "คอนพับ/Bolt Brace", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 203, "component": "เสา/สาย", "code": "SM15", "desc": "สายป้อน/สายสื่อสาร", "cause": "วัสดุเสาไฟ", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 204, "component": "เสา/สาย", "code": "SM16", "desc": "ไฟฟ้าเขตทำงาน", "cause": "Technical Error", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 205, "component": "เสา/สาย", "code": "SM17", "desc": "สายป้อนสวิตซ์ตก", "cause": "Technical Error", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 206, "component": "เสา/สาย", "code": "SM18", "desc": "เกิดไฟไหม้ใต้แนวสายส่ง", "cause": "ภัยธรรมชาติ", "s": 4, "o": 3, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 207, "component": "เสา/สาย", "code": "SM19", "desc": "ไม่ทราบสาเหตุ", "cause": "ไม่ทราบสาเหตุ", "s": 3, "o": 2, "d": 4, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 208, "component": "เสา/สาย", "code": "SM20", "desc": "อื่นๆ", "cause": "อื่นๆ", "s": 3, "o": 2, "d": 4, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 209, "component": "เสา/สาย", "code": "SM21", "desc": "รถชนเสา", "cause": "อุบัติเหตุรถชน", "s": 5, "o": 2, "d": 1, "category": "ความเสี่ยงบุคคลที่ 3 (Third-party)", "strategy": "มาตรการป้องกันเฉพาะ (ไม่ใช่ PM อุปกรณ์)", "note": "ความเสี่ยงจากบุคคลที่ 3 ต้องมีมาตรการป้องกันแยกต่างหาก", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 210, "component": "เสา/สาย", "code": "SM22", "desc": "Cable ชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 211, "component": "เสา/สาย", "code": "SM23", "desc": "Terminator ชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 212, "component": "เสา/สาย", "code": "SM24", "desc": "Lightning ชำรุด", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 213, "component": "เสา/สาย", "code": "SM25", "desc": "switch ปลดทาง Remote", "cause": "Technical Error", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 214, "component": "เสา/สาย", "code": "SM26", "desc": "ชุด Interrupter ไม่ทำงาน", "cause": "Technical Error", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 215, "component": "เสา/สาย", "code": "SM27", "desc": "switching ปลดสวิตซ์ในสายส่ง", "cause": "Technical Error", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 216, "component": "เสา/สาย", "code": "SM28", "desc": "ปลดสวิตซ์ผิดตัว", "cause": "Technical Error", "s": 3, "o": 2, "d": 2, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 217, "component": "เสา/สาย", "code": "SM29", "desc": "อุปกรณ์ชำรุดภายในสถานี กฟน.", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 218, "component": "เสา/สาย", "code": "SM30", "desc": "ต้นไม้ (โดนอุปกรณ์สถานี กฟน.)", "cause": "เสื่อมสภาพ", "s": 4, "o": 3, "d": 1, "category": "Operational (ตรวจจับได้)", "strategy": "Condition-based (PdM)", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 219, "component": "เสา/สาย", "code": "SM31", "desc": "อุปกรณ์ชำรุดภายในสถานี กฟผ./กฟภ.", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 220, "component": "เสา/สาย", "code": "SM32", "desc": "อุปกรณ์ชำรุดภายในสถานี ลูกค้า", "cause": "เสื่อมสภาพ", "s": 4, "o": 2, "d": 3, "category": "Operational-significant (ตรวจจับยาก)", "strategy": "Time-based (PM) บังคับ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 221, "component": "เสา/สาย", "code": "SM33", "desc": "สายส่งไม่มีไฟ", "cause": "อื่นๆ", "s": 3, "o": 2, "d": 4, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"},
  {"id": 222, "component": "เสา/สาย", "code": "SM34", "desc": "Charge Line", "cause": "อื่นๆ", "s": 3, "o": 2, "d": 4, "category": "Economic-low", "strategy": "Condition-based (PdM) หรือ PM ตามรอบ", "note": "", "actionType": "PM", "actionPlan": "", "status": "รอแผนงาน"}
];

let hiRecords = [];
let doughnutChartInstance = null;
let barChartInstance = null;

let currentPage = 1;
const rowsPerPage = 10;

function initApp() {
  const savedTheme = localStorage.getItem('rcm_theme_mode');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('modeToggleBtn').textContent = 'โหมดมืด';
  } else {
    document.getElementById('modeToggleBtn').textContent = 'โหมดสว่าง';
  }

  ['v78','v79'].forEach(v => {
    localStorage.removeItem('rcm_excel_data_' + v);
    localStorage.removeItem('rcm_hi_data_' + v);
    localStorage.removeItem('rcm_cehi_data_' + v);
  });

  const savedFmea = localStorage.getItem('rcm_excel_data_v80');
  if (savedFmea) {
    try { records = JSON.parse(savedFmea); } catch(e) {}
  } else {
    records.forEach(r => {
      const desc = r.desc.toLowerCase();
      const cause = (r.cause || '').toLowerCase();
      if (desc.includes('ร้อน') || desc.includes('อุณหภูมิ') || desc.includes('วัด') || cause.includes('ร้อน')) {
        r.actionType = 'CBM';
      } else {
        r.actionType = 'PM';
      }
    });
  }

  const savedHi = localStorage.getItem('rcm_hi_data_v80');
  if (savedHi) {
    try { hiRecords = JSON.parse(savedHi); } catch(e) {}
  } else {
    hiRecords = records.map((r, idx) => ({
      uid: 'c_' + r.id,
      component: r.component,
      testCategory: '',
      testItems: '',
      si: '',
      smax: '',
      wi: ''
    }));
  }

  categories = [...new Set(records.map(r => r.component ? r.component.split('_')[0] : 'OTHER'))];
  
  populateDgaAssetDropdown();
  initCharts();
  updateDashboardStats();
  renderChips();
  renderTable();
  applyRolePermissions();
}

function populateDgaAssetDropdown() {
  const select = document.getElementById('dgaAssetSelect');
  if (!select) return;
  const uniqueComps = [...new Set(records.map(r => r.component))];
  select.innerHTML = `<option value="">-- กรุณาเลือกอุปกรณ์หม้อแปลง (${uniqueComps.length} รายการ) --</option>`;
  uniqueComps.forEach(comp => {
    const opt = document.createElement('option');
    opt.value = comp;
    opt.textContent = comp;
    select.appendChild(opt);
  });
}

function onDgaAssetChange() {
  const selectEl = document.getElementById('dgaAssetSelect');
  const statusEl = document.getElementById('dgaAssetStatus');
  if (!selectEl || !statusEl) return;
  const val = selectEl.value;
  if (val) {
    statusEl.textContent = `กำลังวิเคราะห์อุปกรณ์: [ ${val} ]`;
    statusEl.style.color = 'var(--primary)';
  } else {
    statusEl.textContent = 'ยังไม่ได้เลือกอุปกรณ์';
    statusEl.style.color = 'var(--teal)';
  }
}

function addHiRow(compName) {
  if (currentUserRole === 'viewer') return;
  const newUid = 'c_' + Date.now() + Math.random().toString(36).substring(2, 7);
  hiRecords.push({
    uid: newUid,
    component: compName,
    testCategory: '',
    testItems: '',
    si: '',
    smax: '',
    wi: ''
  });
  renderTable();
}

function deleteHiRow(uid) {
  if (currentUserRole === 'viewer') return;
  hiRecords = hiRecords.filter(item => item.uid !== uid);
  renderTable();
}

function updateDashboardStats() {
  const total = records.length;
  let normal = 0, warning = 0, critical = 0;
  let totalSi = 0, totalSmax = 0;

  records.forEach(r => {
    const s = Number(r.s) || 0;
    if (s === 5) {
      critical++;
    } else if (s === 4) {
      warning++;
    } else {
      normal++;
    }
  });

  hiRecords.forEach(c => {
    const si = Number(c.si) || 0;
    const smax = Number(c.smax) || 0;
    const wi = Number(c.wi) || 0;
    if (si > 0 && wi > 0) totalSi += si * wi;
    if (smax > 0 && wi > 0) totalSmax += smax * wi;
  });

  const avgHi = totalSmax > 0 ? ((totalSi / totalSmax) * 100).toFixed(2) : '100.00';

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statNormal').textContent = normal;
  document.getElementById('statWarning').textContent = warning;
  document.getElementById('statCritical').textContent = critical;
  document.getElementById('statHiAvg').textContent = avgHi + '%';

  updateCharts(normal, warning, critical);
}

function toggleLightDarkMode() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  document.getElementById('modeToggleBtn').textContent = isLight ? 'โหมดมืด' : 'โหมดสว่าง';
  localStorage.setItem('rcm_theme_mode', isLight ? 'light' : 'dark');
  
  initCharts();
  updateDashboardStats();
  if (currentTab === 'dga') {
    drawDuvalTriangle(33.3, 33.3, 33.3);
  }
}

function setRiskFilter(filter, el) {
  riskFilter = filter;
  currentPage = 1;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderTable();
}

let activeCat = "ALL";
let riskFilter = "ALL";
let query = "";
let currentTab = 'fmea';

function switchTab(tab, el) {
  currentTab = tab;
  currentPage = 1;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  
  const bannerContainer = document.getElementById('bannerContainer');
  bannerContainer.innerHTML = '';
  const tipBtn = document.getElementById('tipButton');
  const titleSub = document.getElementById('modeTitleSub');
  
  if(tab === 'fmea') {
    titleSub.textContent = "การวิเคราะห์โหมดความล้มเหลวและผลกระทบ (FMEA & RPN Assessment)";
    document.getElementById('tableInstruction').textContent = "คลิกที่แถวข้อมูลเพื่อดูรายละเอียดเชิงลึก หรือแก้ไขคะแนนการประเมิน";
    document.getElementById('toolbarRow').style.display = 'flex';
    document.getElementById('chips').style.display = 'flex';
    tipBtn.style.display = 'none';
  } else if(tab === 'hi') {
    titleSub.textContent = "ตารางโครงสร้างดัชนีสุขภาพอุปกรณ์ (Health Index - 222 รายการ)";
    document.getElementById('tableInstruction').textContent = "กรอกหมวดหมู่การทดสอบ พารามิเตอร์ และคะแนนสุขภาพ";
    document.getElementById('toolbarRow').style.display = 'flex';
    document.getElementById('chips').style.display = 'flex';
    tipBtn.style.display = 'none';
  } else if(tab === 'dga') {
    titleSub.textContent = "ระบบวิเคราะห์ก๊าซละลายในน้ำมันหม้อแปลง (Dissolved Gas Analysis)";
    document.getElementById('tableInstruction').textContent = "แสดงผลการคำนวณและวิเคราะห์ก๊าซในน้ำมันหม้อแปลงแยกตามรายตัวอุปกรณ์";
    document.getElementById('toolbarRow').style.display = 'none';
    document.getElementById('chips').style.display = 'none';
    tipBtn.style.display = 'none';
    
    bannerContainer.innerHTML = `
      <div class="plan-info-banner">
        <b>ระบบวิเคราะห์ก๊าซละลาย (DGA) ตามมาตรฐานสากล 6 วิธี:</b><br>
        เลือกอุปกรณ์หม้อแปลงจากเมนูดรอปดาวน์ด้านบน แล้วกรอกค่าความเข้มข้นของก๊าซ (ppm) เพื่อประเมินผล
      </div>
    `;
    setTimeout(() => drawDuvalTriangle(33.3, 33.3, 33.3), 50);
  } else if(tab === 'plan') {
    titleSub.textContent = "แผนงานบำรุงรักษาเชิงป้องกันตามหลัก RCM (Action Plan)";
    document.getElementById('tableInstruction').textContent = "แสดงรายการแผนบำรุงรักษา จัดลำดับตามกลุ่มความสำคัญ (Priority Group)";
    document.getElementById('toolbarRow').style.display = 'flex';
    document.getElementById('chips').style.display = 'none';
    tipBtn.style.display = 'inline-block';
    
    bannerContainer.innerHTML = `
      <div class="plan-info-banner">
        <b>หลักการจัดลำดับแผนงานบำรุงรักษา (ตามเกณฑ์ RCM และ MIL-STD-1629A):</b><br>
        1. กลุ่มวิกฤตสูงสุด (Priority 1 | S=5): แสดงผลลำดับแรกเสมอ<br>
        2. กลุ่มเฝ้าระวัง (Priority 2 | S=4): เรียงลำดับตามคะแนนความเสี่ยง (RPN) จากมากไปน้อย<br>
        3. กลุ่มปานกลางและต่ำ (S <= 3): เรียงลำดับตามคะแนนความเสี่ยง (RPN) จากมากไปน้อย
      </div>
    `;
  }
  renderTable();
}

const chipsWrap = document.getElementById('chips');
function renderChips(){
  chipsWrap.innerHTML = '';
  chipsWrap.appendChild(makeChip('แสดงทั้งหมด (' + records.length + ')', 'ALL'));
  categories.forEach(c => {
    const count = records.filter(r => (r.component ? r.component.split('_')[0] : 'OTHER') === c).length;
    chipsWrap.appendChild(makeChip(c + ' (' + count + ')', c));
  });
}

function makeChip(label, val){
  const c = document.createElement('div');
  c.className = 'chip' + (activeCat === val ? ' active' : '');
  c.textContent = label;
  c.addEventListener('click', () => { activeCat = val; currentPage = 1; renderChips(); renderTable(); });
  return c;
}

const tbody = document.getElementById('tbody');
const tfoot = document.getElementById('tableFoot');
const emptyState = document.getElementById('emptyState');
const visibleCountEl = document.getElementById('visibleCount');

function escapeHtml(str){
  return String(str || '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function highlight(text, q){
  const esc = escapeHtml(text);
  if(!q) return esc;
  try{
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return esc.replace(re, '<mark>$1</mark>');
  }catch(e){ return esc; }
}

function changePage(direction) {
  currentPage += direction;
  renderTable();
}

function calcDga(methodNo) {
  const assetEl = document.getElementById('dgaAssetSelect');
  const asset = assetEl ? assetEl.value : '';
  if (!asset && methodNo === 4) {
    alert("กรุณาเลือกอุปกรณ์หม้อแปลงที่ต้องการวิเคราะห์ก่อนทำการคำนวณ");
    return;
  }

  if (methodNo === 4) {
    let ch4 = parseFloat(document.getElementById('dga_dv_ch4').value) || 0;
    let c2h4 = parseFloat(document.getElementById('dga_dv_c2h4').value) || 0;
    let c2h2 = parseFloat(document.getElementById('dga_dv_c2h2').value) || 0;
    let sum = ch4 + c2h4 + c2h2;
    if (sum === 0) sum = 1;
    let p_ch4 = (ch4 / sum) * 100;
    let p_c2h4 = (c2h4 / sum) * 100;
    let p_c2h2 = (c2h2 / sum) * 100;

    drawDuvalTriangle(p_ch4, p_c2h4, p_c2h2);
    
    let zone = "Slight Overheating (OT)";
    if (p_c2h2 > 20) zone = "Discharge of High Energy (D3)";
    else if (p_c2h4 > 50) zone = "Thermal Fault > 700 C (T3)";
    
    document.getElementById('res_dga_4').innerHTML = `[${asset}] โซนความเสียหาย: <b>${zone}</b>`;
  } else {
    const resultBox = document.getElementById('res_dga_' + methodNo);
    resultBox.innerHTML = `[${asset || 'อุปกรณ์ทั่วไป'}] ผลการประเมิน: ตรวจพบสภาพปกติ (รอข้อมูลผลแล็บจริง)`;
  }
}

function drawDuvalTriangle(p_ch4, p_c2h4, p_c2h2) {
  const canvas = document.getElementById('duvalCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const isLight = document.body.classList.contains('light-mode');
  const strokeColor = isLight ? '#334155' : '#94a3b8';
  const textColor = isLight ? '#0f172a' : '#f8fafc';

  const ax = w / 2, ay = 15;
  const bx = 20, by = h - 20;
  const cx = w - 20, cy = h - 20;

  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.lineTo(cx, cy);
  ctx.closePath();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.font = '9px sans-serif';
  ctx.fillText('C2H2', ax - 12, ay - 5);
  ctx.fillText('CH4', bx - 5, by + 12);
  ctx.fillText('C2H4', cx - 12, cy + 12);

  const px = (p_ch4 * bx + p_c2h4 * cx + p_c2h2 * ax) / 100;
  const py = (p_ch4 * by + p_c2h4 * cy + p_c2h2 * ay) / 100;

  ctx.beginPath();
  ctx.arc(px, py, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#ef4444';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function renderTable(){
  const q = query.trim().toLowerCase();
  const thead = document.getElementById('tableHead');
  const paginationBar = document.getElementById('paginationBar');
  const mainTableWrapper = document.getElementById('mainTableWrapper');
  const dgaView = document.getElementById('dgaView');

  if (currentTab === 'dga') {
    paginationBar.style.display = 'none';
    mainTableWrapper.style.display = 'none';
    dgaView.style.display = 'block';
    document.getElementById('countDisplay').style.display = 'none';
    emptyState.style.display = 'none';
    return;
  } else {
    dgaView.style.display = 'none';
    mainTableWrapper.style.display = 'block';
    document.getElementById('countDisplay').style.display = 'inline';
  }

  const isReadOnly = (currentUserRole === 'viewer');
  const isOperator = (currentUserRole === 'operator');

  if (currentTab === 'fmea') {
    paginationBar.style.display = 'flex';
    thead.innerHTML = `
      <tr>
        <th style="width:40px;">ลำดับ</th>
        <th style="width:130px;">อุปกรณ์ (Component)</th>
        <th style="width:75px;">รหัส</th>
        <th>โหมดความล้มเหลว (Failure Mode)</th>
        <th>สาเหตุความเสียหาย (Failure Cause)</th>
        <th style="width:45px; text-align:center;">S</th>
        <th style="width:45px; text-align:center;">O</th>
        <th style="width:45px; text-align:center;">D</th>
        <th style="width:60px; text-align:center;">RPN</th>
        <th style="width:140px; text-align:center;">กลุ่มความสำคัญ</th>
        <th style="width:200px;">หมายเหตุ / บันทึกเพิ่มเติม</th>
      </tr>
    `;

    const filtered = records.filter(r => {
      const catPrefix = r.component ? r.component.split('_')[0] : 'OTHER';
      if(activeCat !== 'ALL' && catPrefix !== activeCat) return false;
      const s = Number(r.s) || 0;
      if (riskFilter === 'CRITICAL' && s !== 5) return false;
      if (riskFilter === 'WARNING' && s !== 4) return false;
      if(!q) return true;
      return (r.code?.toLowerCase().includes(q) || r.desc?.toLowerCase().includes(q) || r.cause?.toLowerCase().includes(q) || r.component?.toLowerCase().includes(q) || (r.note && r.note.toLowerCase().includes(q)));
    });

    const totalFiltered = filtered.length;
    const totalPages = Math.ceil(totalFiltered / rowsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * rowsPerPage;
    const paginatedItems = filtered.slice(startIdx, startIdx + rowsPerPage);

    tbody.innerHTML = paginatedItems.map(r => {
      const s = Number(r.s) || 0;
      const o = Number(r.o) || 0;
      const d = Number(r.d) || 0;
      const rpn = s * o * d;
      
      let flagClass = 'flag-green';
      let flagText = 'ปานกลาง / ต่ำ';
      if (s === 5) {
        flagClass = 'flag-red';
        flagText = 'วิกฤตสูงสุด (Priority 1)';
      } else if (s === 4) {
        flagClass = 'flag-orange';
        flagText = 'ระดับเฝ้าระวัง';
      }

      // ช่าง (Operator) และผู้ชม (Viewer) ไม่มีสิทธิ์แก้ไขตาราง FMEA (ล็อกเป็น disabled)
      const disabledAttr = (isReadOnly || isOperator) ? 'disabled' : '';

      return `
        <tr onclick="openDrilldown(${r.id})">
          <td class="num">${r.id}</td>
          <td><b>${escapeHtml(r.component)}</b></td>
          <td><span class="code-pill mono">${escapeHtml(r.code)}</span></td>
          <td>${highlight(r.desc, q)}</td>
          <td style="color:var(--muted);">${highlight(r.cause, q)}</td>
          <td style="text-align:center;" onclick="event.stopPropagation()"><input type="number" min="1" max="10" class="score-input" value="${r.s ?? ''}" ${disabledAttr} oninput="updateFmea(${r.id}, 's', this.value)"></td>
          <td style="text-align:center;" onclick="event.stopPropagation()"><input type="number" min="1" max="10" class="score-input" value="${r.o ?? ''}" ${disabledAttr} oninput="updateFmea(${r.id}, 'o', this.value)"></td>
          <td style="text-align:center;" onclick="event.stopPropagation()"><input type="number" min="1" max="10" class="score-input" value="${r.d ?? ''}" ${disabledAttr} oninput="updateFmea(${r.id}, 'd', this.value)"></td>
          <td style="text-align:center;" class="mono">${rpn > 0 ? rpn : '-'}</td>
          <td style="text-align:center;"><span class="flag-badge ${flagClass}">${flagText}</span></td>
          <td onclick="event.stopPropagation()"><input type="text" class="text-input note-input" value="${escapeHtml(r.note || '')}" placeholder="ระบุหมายเหตุ..." ${disabledAttr} oninput="updateFmea(${r.id}, 'note', this.value)"></td>
        </tr>
      `;
    }).join('');

    document.getElementById('paginationInfo').textContent = `แสดงรายการที่ ${totalFiltered > 0 ? startIdx + 1 : 0}-${Math.min(startIdx + rowsPerPage, totalFiltered)} จากทั้งหมด ${totalFiltered} รายการ`;
    document.getElementById('pageIndicator').textContent = `หน้า ${currentPage} / ${totalPages}`;
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage === totalPages || totalPages === 0;

    visibleCountEl.textContent = totalFiltered;
    emptyState.style.display = totalFiltered === 0 ? 'block' : 'none';

  } else if (currentTab === 'hi') {
    paginationBar.style.display = 'none';
    thead.innerHTML = `
      <tr>
        <th style="width:40px;">ลำดับ</th>
        <th style="width:140px;">อุปกรณ์ (Component)</th>
        <th style="width:180px;">หมวดหมู่การทดสอบ (Test Category)</th>
        <th style="width:200px;">พารามิเตอร์ (Test Items)</th>
        <th style="width:65px; text-align:center;">คะแนนจริง (Si)</th>
        <th style="width:65px; text-align:center;">คะแนนสูงสุด (Smax)</th>
        <th style="width:65px; text-align:center;">น้ำหนัก (Wi)</th>
        <th style="width:75px; text-align:center;">Si x Wi</th>
        <th style="width:70px; text-align:center;">จัดการ</th>
      </tr>
    `;

    const filteredHi = hiRecords.filter(item => {
      if (activeCat !== 'ALL') {
        let catPrefix = item.component ? item.component.split('_')[0] : '';
        if (catPrefix !== activeCat) return false;
      }
      if (q && !item.component.toLowerCase().includes(q) && !item.testCategory.toLowerCase().includes(q) && !item.testItems.toLowerCase().includes(q)) return false;
      return true;
    });

    const grouped = {};
    filteredHi.forEach(r => {
      if (!grouped[r.component]) grouped[r.component] = [];
      grouped[r.component].push(r);
    });

    let htmlRows = '';
    let globalTotalSiWi = 0;
    let globalTotalSmaxWi = 0;
    let rowIdx = 1;

    // ช่าง (Operator) มีสิทธิ์กรอกคะแนนทดสอบสุขภาพ HI ได้ แต่ห้ามลบแถวโครงสร้างหลัก
    const disabledAttr = isReadOnly ? 'disabled' : '';

    Object.keys(grouped).forEach(comp => {
      const items = grouped[comp];
      let compSiWi = 0;
      let compSmaxWi = 0;

      items.forEach(r => {
        const si = Number(r.si) || 0;
        const smax = Number(r.smax) || 0;
        const wi = Number(r.wi) || 0;
        const siWi = si > 0 && wi > 0 ? (si * wi).toFixed(2) : '-';

        if (si > 0 && wi > 0) compSiWi += si * wi;
        if (smax > 0 && wi > 0) compSmaxWi += smax * wi;

        htmlRows += `
          <tr>
            <td class="num">${rowIdx++}</td>
            <td><b>${escapeHtml(r.component)}</b></td>
            <td><input type="text" class="text-input" value="${escapeHtml(r.testCategory || '')}" placeholder="ระบุหมวด..." ${disabledAttr} oninput="updateHi('${r.uid}', 'testCategory', this.value)"></td>
            <td><input type="text" class="text-input" value="${escapeHtml(r.testItems || '')}" placeholder="ระบุพารามิเตอร์..." ${disabledAttr} oninput="updateHi('${r.uid}', 'testItems', this.value)"></td>
            <td style="text-align:center;"><input type="number" class="score-input" value="${r.si ?? ''}" ${disabledAttr} oninput="updateHi('${r.uid}', 'si', this.value)"></td>
            <td style="text-align:center;"><input type="number" class="score-input" value="${r.smax ?? ''}" ${disabledAttr} oninput="updateHi('${r.uid}', 'smax', this.value)"></td>
            <td style="text-align:center;"><input type="number" class="score-input" value="${r.wi ?? ''}" ${disabledAttr} oninput="updateHi('${r.uid}', 'wi', this.value)"></td>
            <td style="text-align:center;" class="mono">${siWi}</td>
            <td style="text-align:center;">
              ${currentUserRole === 'admin' ? `<button class="del-row-btn" onclick="deleteHiRow('${r.uid}')" title="ลบรายการ">ลบ</button>` : '-'}
            </td>
          </tr>
        `;
      });

      const compHi = compSmaxWi > 0 ? ((compSiWi / compSmaxWi) * 100).toFixed(2) : '0.00';
      globalTotalSiWi += compSiWi;
      globalTotalSmaxWi += compSmaxWi;

      htmlRows += `
        <tr style="background:var(--panel-2); border-top:1px solid var(--border);">
          <td colspan="9" style="padding:10px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; flex-wrap:wrap; gap:8px;">
              ${currentUserRole === 'admin' ? `<button class="action-btn" onclick="addHiRow('${escapeHtml(comp)}')">เพิ่มรายการทดสอบให้ ${escapeHtml(comp)}</button>` : '<span></span>'}
              <div style="font-size:0.8rem; color:var(--teal);">
                <b>ผลรวมคะแนน:</b> <span class="mono">${compSiWi.toFixed(2)}</span> | <b>ดัชนีสุขภาพ (HI):</b> <span class="mono">${compHi}%</span>
              </div>
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = htmlRows;
    visibleCountEl.textContent = filteredHi.length;
    emptyState.style.display = filteredHi.length === 0 ? 'block' : 'none';

  } else {
    paginationBar.style.display = 'flex';
    thead.innerHTML = `
      <tr>
        <th style="width:40px; text-align:center;">ลำดับ</th>
        <th style="width:140px;">อุปกรณ์ (Component)</th>
        <th style="width:75px;">รหัส</th>
        <th>โหมดความล้มเหลว (Failure Mode)</th>
        <th style="width:55px; text-align:center;">RPN</th>
        <th style="width:140px; text-align:center;">กลุ่มความสำคัญ</th>
        <th style="width:140px; text-align:center;">กลยุทธ์บำรุงรักษา</th>
        <th style="width:250px;">รายละเอียดแผนปฏิบัติการ</th>
        <th style="width:120px; text-align:center;">สถานะ</th>
      </tr>
    `;

    const filteredPlan = records.filter(r => {
      const s = Number(r.s) || 0;
      const o = Number(r.o) || 0;
      const d = Number(r.d) || 0;
      const rpn = s * o * d;
      if (rpn === 0) return false;
      if (riskFilter === 'CRITICAL' && s !== 5) return false;
      if (riskFilter === 'WARNING' && s !== 4) return false;
      if (q && !r.code?.toLowerCase().includes(q) && !r.desc?.toLowerCase().includes(q) && !r.component?.toLowerCase().includes(q)) return false;
      return true;
    }).sort((a, b) => {
      const sA = Number(a.s) || 0;
      const sB = Number(b.s) || 0;
      
      const groupA = sA === 5 ? 3 : (sA === 4 ? 2 : 1);
      const groupB = sB === 5 ? 3 : (sB === 4 ? 2 : 1);
      
      if (groupA !== groupB) {
        return groupB - groupA;
      }
      
      const rpnA = sA * (Number(a.o)||0) * (Number(a.d||0));
      const rpnB = sB * (Number(b.o)||0) * (Number(b.d||0));
      return rpnB - rpnA;
    });

    const totalPlan = filteredPlan.length;
    const totalPagesPlan = Math.ceil(totalPlan / rowsPerPage) || 1;
    if (currentPage > totalPagesPlan) currentPage = totalPagesPlan;
    if (currentPage < 1) currentPage = 1;

    const startIdxPlan = (currentPage - 1) * rowsPerPage;
    const paginatedPlan = filteredPlan.slice(startIdxPlan, startIdxPlan + rowsPerPage);

    const disabledAttr = isReadOnly ? 'disabled' : '';

    if (totalPlan === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:40px; color:var(--muted);">ไม่พบรายการที่ตรงกับเงื่อนไขการค้นหา</td></tr>`;
      paginationBar.style.display = 'none';
    } else {
      tbody.innerHTML = paginatedPlan.map((r, index) => {
        const s = Number(r.s) || 0;
        const rpn = s * (Number(r.o)||0) * (Number(r.d)||0);
        
        let flagClass = 'flag-green';
        let flagText = 'ปานกลาง / ต่ำ';
        if (s === 5) {
          flagClass = 'flag-red';
          flagText = 'วิกฤตสูงสุด (Priority 1)';
        } else if (s === 4) {
          flagClass = 'flag-orange';
          flagText = 'ระดับเฝ้าระวัง';
        }

        const absoluteIndex = startIdxPlan + index + 1;

        return `
          <tr onclick="openDrilldown(${r.id})">
            <td style="text-align:center;"><span class="mono" style="font-weight:bold; color:var(--primary);">#${absoluteIndex}</span></td>
            <td><b>${escapeHtml(r.component)}</b></td>
            <td><span class="code-pill mono">${escapeHtml(r.code)}</span></td>
            <td>${escapeHtml(r.desc)}</td>
            <td style="text-align:center;" class="mono">${rpn}</td>
            <td style="text-align:center;"><span class="flag-badge ${flagClass}">${flagText}</span></td>
            <td style="text-align:center;" onclick="event.stopPropagation()">
              <select class="text-input" style="text-align:center;" ${disabledAttr} onchange="updateFmea(${r.id}, 'actionType', this.value)">
                <option value="PM" ${r.actionType === 'PM' ? 'selected' : ''}>PM (ตามรอบ)</option>
                <option value="CBM" ${r.actionType === 'CBM' ? 'selected' : ''}>CBM (ตามสภาพ)</option>
              </select>
            </td>
            <td onclick="event.stopPropagation()"><input type="text" class="text-input" value="${escapeHtml(r.actionPlan || '')}" placeholder="ระบุแผนปฏิบัติการ..." ${disabledAttr} oninput="updateFmea(${r.id}, 'actionPlan', this.value)"></td>
            <td style="text-align:center;" onclick="event.stopPropagation()">
              <select class="text-input" style="text-align:center;" ${isReadOnly ? 'disabled' : ''} onchange="updateFmea(${r.id}, 'status', this.value)">
                <option value="รอแผนงาน" ${r.status === 'รอแผนงาน' ? 'selected' : ''}>รอแผนงาน</option>
                <option value="กำลังดำเนินการ" ${r.status === 'กำลังดำเนินการ' ? 'selected' : ''}>กำลังดำเนินการ</option>
                <option value="เสร็จสิ้น" ${r.status === 'เสร็จสิ้น' ? 'selected' : ''}>เสร็จสิ้น</option>
              </select>
            </td>
          </tr>
        `;
      }).join('');

      document.getElementById('paginationInfo').textContent = `แสดงรายการที่ ${startIdxPlan + 1}-${Math.min(startIdxPlan + rowsPerPage, totalPlan)} จากทั้งหมด ${totalPlan} รายการ`;
      document.getElementById('pageIndicator').textContent = `หน้า ${currentPage} / ${totalPagesPlan}`;
      document.getElementById('prevPageBtn').disabled = currentPage === 1;
      document.getElementById('nextPageBtn').disabled = currentPage === totalPagesPlan;
    }
    visibleCountEl.textContent = totalPlan;
    emptyState.style.display = 'none';
  }
}

function updateFmea(id, field, val) {
  if (currentUserRole === 'viewer') return;
  // ช่าง (Operator) ห้ามแก้ไขคะแนน S, O, D แต่แก้ไข Action Plan และ Status ได้
  if (currentUserRole === 'operator' && ['s', 'o', 'd'].includes(field)) return;
  
  const item = records.find(r => r.id === id);
  if (item) {
    item[field] = val;
    if (['s', 'o', 'd'].includes(field)) {
      updateDashboardStats();
    }
    renderTable();
  }
}

function updateHi(uid, field, val) {
  if (currentUserRole === 'viewer') return;
  const item = hiRecords.find(r => r.uid === uid);
  if (item) {
    item[field] = val;
    updateDashboardStats();
  }
}

function openDrilldown(id) {
  const r = records.find(item => item.id === id);
  if (!r) return;
  const rpn = (Number(r.s)||0) * (Number(r.o)||0) * (Number(r.d)||0);

  document.getElementById('modalComp').textContent = r.component;
  document.getElementById('modalCode').textContent = r.code;
  document.getElementById('modalDesc').textContent = r.desc;
  document.getElementById('modalCause').textContent = r.cause || '-';
  document.getElementById('modalRpn').textContent = rpn > 0 ? rpn : 'ยังไม่ประเมิน';
  document.getElementById('modalCategory').textContent = r.category || 'Economic-low';
  document.getElementById('modalStrategy').textContent = r.strategy || 'Condition-based (PdM)';
  document.getElementById('modalNote').textContent = r.note || '-';
  
  document.getElementById('drilldownModal').classList.add('open');
}

function closeModal() {
  document.getElementById('drilldownModal').classList.remove('open');
}

function openGuidelineModal() {
  document.getElementById('guidelineModal').classList.add('open');
}

function closeGuidelineModal() {
  document.getElementById('guidelineModal').classList.remove('open');
}

function openTipModal() {
  document.getElementById('tipModal').classList.add('open');
}

function closeTipModal() {
  document.getElementById('tipModal').classList.remove('open');
}

function handleOutsideClick(event, modalId) {
  const modal = document.getElementById(modalId);
  if (event.target === modal) {
    if (modalId === 'guidelineModal') closeGuidelineModal();
    if (modalId === 'drilldownModal') closeModal();
    if (modalId === 'tipModal') closeTipModal();
  }
}

function exportToCSV() {
  let csvContent = "\uFEFFลำดับ,อุปกรณ์,รหัส,โหมดความล้มเหลว,สาเหตุความเสียหาย,ความรุนแรง,ความถี่,การตรวจพบ,RPN,ประเภทผลกระทบ,กลยุทธ์แนะนำ,หมายเหตุ\n";
  records.forEach(r => {
    const s = Number(r.s) || 0;
    const rpn = s * (Number(r.o)||0) * (Number(r.d)||0);
    csvContent += `"${r.id}","${r.component}","${r.code}","${r.desc}","${r.cause || ''}","${r.s || ''}","${r.o || ''}","${r.d || ''}","${rpn}","${r.category || ''}","${r.strategy || ''}","${r.note || ''}"\n`;
  });
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `RCM_Report_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function saveData() {
  if (currentUserRole === 'viewer') {
    alert('สิทธิ์ผู้ชมทั่วไปไม่สามารถบันทึกข้อมูลได้');
    return;
  }
  localStorage.setItem('rcm_excel_data_v80', JSON.stringify(records));
  localStorage.setItem('rcm_hi_data_v80', JSON.stringify(hiRecords));
  alert('บันทึกข้อมูลเข้าสู่ระบบเรียบร้อยแล้ว');
}

function initCharts() {
  const isLight = document.body.classList.contains('light-mode');
  const textColor = isLight ? '#0f172a' : '#f0f4f8';

  const ctxDoughnut = document.getElementById('riskDoughnutChart').getContext('2d');
  if (doughnutChartInstance) doughnutChartInstance.destroy();
  doughnutChartInstance = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
      labels: ['ปานกลาง / ต่ำ', 'ระดับเฝ้าระวัง', 'วิกฤตสูงสุด (P1)'],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: ['#14b8a6', '#f59e0b', '#ef4444'],
        borderWidth: 3,
        borderColor: isLight ? '#ffffff' : '#111827',
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor, font: { family: 'Noto Sans Thai', size: 11 }, padding: 12 } }
      }
    }
  });

  const ctxBar = document.getElementById('topRiskBarChart').getContext('2d');
  if (barChartInstance) barChartInstance.destroy();
  barChartInstance = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['-', '-', '-', '-', '-'],
      datasets: [{
        label: 'คะแนน RPN',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(245, 158, 11, 0.85)',
        borderColor: '#f59e0b',
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 22
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { color: textColor, font: { family: 'Noto Sans Thai', size: 10 } }, grid: { display: false } },
        y: { ticks: { color: textColor }, grid: { color: isLight ? '#e2e8f0' : '#2d3846' } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function updateCharts(normal, warning, critical) {
  if (doughnutChartInstance) {
    doughnutChartInstance.data.datasets[0].data = [normal, warning, critical];
    doughnutChartInstance.update();
  }

  if (barChartInstance) {
    let sortedRecords = [...records].map(r => ({
      name: r.code + ' (' + r.component + ')',
      rpn: (Number(r.s)||0) * (Number(r.o)||0) * (Number(r.d)||0)
    })).sort((a, b) => b.rpn - a.rpn).slice(0, 5);

    barChartInstance.data.labels = sortedRecords.map(item => item.name);
    barChartInstance.data.datasets[0].data = sortedRecords.map(item => item.rpn);
    barChartInstance.update();
  }
}

document.getElementById('search').addEventListener('input', (e) => {
  query = e.target.value;
  currentPage = 1;
  renderTable();
});

// เริ่มต้นแอปพลิเคชัน
initApp();
