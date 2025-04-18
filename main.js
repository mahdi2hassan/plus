/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu"){
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  }
/*HAZOOOOOOMA*/
  window.onscroll = function() {headerShadow()};

  function headerShadow() {
    const navHeader =document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {

      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";

    } else {

      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";

    }
  }



/* ----- TYPING EFFECT ----- */
 var typingEffect = new Typed(".typedText",{
    strings : ["Welcome To .","PLUSINMATH  .","Mr.Mahdi .", "Hassan .",],
    loop : true,
    typeSpeed : 100, 
    backSpeed : 80,
    backDelay : 2000
 })


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
 const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true     
 })

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})


/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})



/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 

        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

    }  else {

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')

    }
  })
}
/*start dark mode in js*/
let re4 = document.getElementById('mylink');
let re = document.getElementById('dar');
let origin = 'style.css';
let newHref = 'dark.css';
let isorigin = true;
re.addEventListener('click',()=>{
  if(isorigin){
    re4.setAttribute('href',newHref);
    re.textContent=' ☀️';
  }else{
    re4.setAttribute('href',origin);
    re.textContent ='🌘'
  }
  isorigin = !isorigin
})
let inpro = document.getElementById('wait');
inpro.onclick = function(){
  Swal.fire({
    text: "Our Courses In Progress ⚙️",
    icon: "info"
  });
      }


window.addEventListener('scroll', scrollActive)

// تبديل حقول الأسئلة بناءً على نوع السؤال
function toggleQuestionFields() {
    const questionType = document.getElementById("questionType").value;
    const objectiveFields = document.getElementById("objectiveFields");
    objectiveFields.style.display = questionType === "objective" ? "block" : "none";
}

// تبديل حقول الفيديو بناءً على المصدر
function toggleVideoFields() {
    const videoSource = document.getElementById("videoSource").value;
    document.getElementById("videoUrl").style.display = videoSource === "url" ? "block" : "none";
    document.getElementById("videoFile").style.display = videoSource === "upload" ? "block" : "none";
}

// إضافة سؤال (موضوعي أو غير موضوعي)
function addQuestion() {
    const questionText = document.getElementById("questionText").value;
    const courseId = document.getElementById("questionCourse").value;
    const questionType = document.getElementById("questionType").value;
    let questionData = { courseId, text: questionText, type: questionType };

    if (questionType === "objective") {
        const options = [
            document.getElementById("option1").value,
            document.getElementById("option2").value,
            document.getElementById("option3").value,
            document.getElementById("option4").value
        ];
        const correctOption = document.getElementById("correctOption").value;
        if (options.every(opt => opt) && correctOption) {
            questionData.options = options;
            questionData.correctOption = correctOption;
        } else {
            alert("يرجى ملء جميع الخيارات وتحديد الإجابة الصحيحة!");
            return;
        }
    }

    if (questionText && courseId) {
        questions.push(questionData);
        localStorage.setItem('questions', JSON.stringify(questions));
        renderQuestions();
        document.getElementById("questionText").value = "";
        document.getElementById("questionCourse").value = "";
        document.getElementById("option1").value = "";
        document.getElementById("option2").value = "";
        document.getElementById("option3").value = "";
        document.getElementById("option4").value = "";
        document.getElementById("correctOption").value = "";
    }
}

// تعديل سؤال
function editQuestion(index) {
    const question = questions[index];
    document.getElementById("questionCourse").value = question.courseId;
    document.getElementById("questionText").value = question.text;
    document.getElementById("questionType").value = question.type;
    toggleQuestionFields();
    if (question.type === "objective") {
        document.getElementById("option1").value = question.options[0];
        document.getElementById("option2").value = question.options[1];
        document.getElementById("option3").value = question.options[2];
        document.getElementById("option4").value = question.options[3];
        document.getElementById("correctOption").value = question.correctOption;
    }
    deleteQuestion(index);
}

// إضافة فيديو
function addVideo() {
    const videoSource = document.getElementById("videoSource").value;
    const courseId = document.getElementById("videoCourse").value;
    const thumbnail = document.getElementById("thumbnail").files[0];
    let videoUrl = "";

    if (videoSource === "url") {
        videoUrl = document.getElementById("videoUrl").value;
    } else {
        const videoFile = document.getElementById("videoFile").files[0];
        if (videoFile) {
            videoUrl = URL.createObjectURL(videoFile); // مؤقتًا لعرض الفيديو
        }
    }

    if (videoUrl && courseId && thumbnail) {
        const thumbnailUrl = URL.createObjectURL(thumbnail);
        videos.push({ courseId, url: videoUrl, thumbnail: thumbnailUrl });
        localStorage.setItem('videos', JSON.stringify(videos));
        renderVideos();
        document.getElementById("videoUrl").value = "";
        document.getElementById("videoFile").value = "";
        document.getElementById("thumbnail").value = "";
        document.getElementById("videoCourse").value = "";
    } else {
        alert("يرجى إدخال رابط الفيديو أو رفع ملف وصورة مصغرة!");
    }
}

// حذف فيديو
function deleteVideo(index) {
    videos.splice(index, 1);
    localStorage.setItem('videos', JSON.stringify(videos));
    renderVideos();
}

// تعديل مقرر
function editCourse(index) {
    const course = courses[index];
    document.getElementById("courseName").value = course.name;
    document.getElementById("courseId").value = course.id;
    document.getElementById("courseUrl").value = course.url;
    deleteCourse(index);
}

// عرض المقررات
function renderCourses() {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";
    courses.forEach((course, index) => {
        const div = document.createElement("div");
        div.className = "course-item";
        div.innerHTML = `
            ${course.name}
            <div>
                <button onclick="editCourse(${index})">تعديل</button>
                <button onclick="deleteCourse(${index})">حذف</button>
            </div>
        `;
        courseList.appendChild(div);
    });
}

// عرض الفيديوهات
function renderVideos() {
    const videoList = document.getElementById("videoList");
    videoList.innerHTML = "";
    videos.forEach((video, index) => {
        const course = courses.find(c => c.id === video.courseId);
        const div = document.createElement("div");
        div.className = "video-item";
        div.innerHTML = `
            <img src="${video.thumbnail}" alt="Thumbnail" style="width: 100px; height: auto;">
            <a href="${video.url}" target="_blank">فيديو ${index + 1} (${course ? course.name : 'غير مرتبط'})</a>
            <div>
                <button onclick="editVideo(${index})">تعديل</button>
                <button onclick="deleteVideo(${index})">حذف</button>
            </div>
        `;
        videoList.appendChild(div);
    });
}

// عرض الأسئلة
function renderQuestions() {
    const questionList = document.getElementById("questionList");
    questionList.innerHTML = "";
    questions.forEach((question, index) => {
        const course = courses.find(c => c.id === question.courseId);
        const div = document.createElement("div");
        div.className = "question-item";
        let questionDetails = `سؤال ${index + 1}: ${question.text} (${course ? course.name : 'غير مرتبط'})`;
        if (question.type === "objective") {
            questionDetails += `<br>خيارات: ${question.options.join(", ")}`;
        }
        div.innerHTML = `
            ${questionDetails}
            <div>
                <button onclick="editQuestion(${index})">تعديل</button>
                <button onclick="deleteQuestion(${index})">حذف</button>
            </div>
        `;
        questionList.appendChild(div);
    });
}

// تعديل فيديو
function editVideo(index) {
    const video = videos[index];
    document.getElementById("videoCourse").value = video.courseId;
    document.getElementById("videoSource").value = video.url.startsWith("blob:") ? "upload" : "url";
    toggleVideoFields();
    if (!video.url.startsWith("blob:")) {
        document.getElementById("videoUrl").value = video.url;
    }
    deleteVideo(index);
}
