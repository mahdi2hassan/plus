// تحميل المقررات
const courses = JSON.parse(localStorage.getItem('courses')) || [
    { id: "course1", name: "مقرر الصف الأول الإعدادي", url: "grade1-prep.html", studentCode: null },
    { id: "course2", name: "مقرر الصف الثاني الإعدادي", url:

 "grade2-prep.html", studentCode: null },
    { id: "course3", name: "مقرر الصف الثالث الإعدادي", url: "grade3-prep.html", studentCode: null },
    { id: "course4", name: "مقرر الصف الأول الثانوي", url: "grade1-sec.html", studentCode: null },
    { id: "course5", name: "مقرر الصف الثاني الثانوي علمي", url: "grade2-sec-sci.html", studentCode: null },
    { id: "course6", name: "مقرر الصف الثاني الثانوي أدبي", url: "grade2-sec-lit.html", studentCode: null },
    { id: "course7", name: "مقرر الصف الثالث الثانوي علمي", url: "grade3-sec-sci.html", studentCode: null },
    { id: "course8", name: "مقرر الصف الثالث الثانوي أدبي إحصاء", url: "grade3-sec-lit.html", studentCode: null }
];

// تحديث localStorage
if (!localStorage.getItem('courses')) {
    localStorage.setItem('courses', JSON.stringify(courses));
}

// عرض المقررات
function renderCourses() {
    const courseContainer = document.getElementById('courseContainer');
    courseContainer.innerHTML = '';
    const currentStudentCode = localStorage.getItem('currentStudentCode');
    const displayCourses = currentStudentCode
        ? courses.filter(course => course.studentCode === currentStudentCode || course.studentCode === null)
        : courses;

    if (displayCourses.length === 0) {
        courseContainer.innerHTML = `
            <p class="no-courses">
                لا توجد مقررات متاحة لحسابك. 
                <a href="login.html">سجل الدخول</a> أو 
                <a href="register.html">أنشئ حسابًا جديدًا</a>.
            </p>`;
        return;
    }

    displayCourses.forEach(course => {
        const div = document.createElement('div');
        div.className = 'course-box';
        div.innerHTML = `
            <h3>${course.name}</h3>
            <a href="${currentStudentCode ? course.url : 'login.html'}">عرض المقرر</a>
        `;
        courseContainer.appendChild(div);
    });
}

renderCourses();

// إرسال رسالة واتساب
function sendWhatsApp() {
    const phoneNumber = "+201558870907";
    const message = "أسعار الاشتراك";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('currentStudentCode');
    window.location.href = 'login.html';
}

// قائمة التنقل المحمولة
document.querySelector('.nav-menu-btn').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('responsive');
});

// تبديل الوضع الغامق
document.getElementById('darkModeBtn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : '');
    document.getElementById('darkModeBtn').innerHTML = isDark ? '☀️' : '🌙';
});

// تحميل الوضع الغامق إذا كان موجودًا
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeBtn').innerHTML = '☀️';
}