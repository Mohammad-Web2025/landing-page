const wordchange = document.getElementById("title");
const nameSpan = document.getElementById("name");
const names = ["لندینگ پیج", "صفحه فروش", "صفحه فرود"];
const baseText = "ابزار ساده";
let index = 0;
function changename() {
  //اگر این اسمی که داخل متغییر basetext است وجود داشت اینو به اون متن اضافه کن
  if (wordchange.textContent.includes(baseText))
    nameSpan.textContent = names[index];
  index++;
  if (index === names.length) index = 0;
  setTimeout(changename, 2000);
}
changename();

//انتخاب دکمه و نمایش عکس مربوط
const textclick = document.querySelectorAll(".text-top-main");
const images = document.querySelectorAll(".bot-page-main-img");
textclick.forEach((items, index) => {
  items.addEventListener("click", (e) => {
    e.stopPropagation(); //جلوگیری از پاک شدن فوری
    textclick.forEach((i) => (i.style.backgroundColor = "")); //ریست کلی که همه بک گراندشون قبل کلیک کردن روی اون ایتم حذف شود
    items.style.backgroundColor = "aliceblue"; //بک گراند
    images.forEach((select) => (select.style.display = "none")); // ریست نمایش همه تصاویر
    images[index].style.display = "block";
  });
});
document.addEventListener("click", () => {
  textclick.forEach((el) => (el.style.backgroundColor = "")); //اگر روی جای دیگه صفحه به غیر از این ایتم ها کلیک کرد بک گراند حذف شود
  images.forEach((img) => (img.style.display = "none"));
  images.forEach((img, index) => {
    images[0].style.display = "block";
  });
});

//وقتی اسکرول شد منو ما این کلاس استایل رو بگیره
window.addEventListener("scroll", function () {
  const nav = this.document.querySelector("header");
  if (this.window.scrollY > 30) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});

//عکس از کوچک به بزرگ تبدیل شود با انیمیشن
const section = document.querySelectorAll(".right-main-page2"); //document.querySelector() می‌رود داخل صفحه‌ی HTML و اولین المانی که کلاس right-main-page2 دارد را پیدا می‌کند.
const section2 = document.querySelectorAll(".right-main-page3");
/*یک IntersectionObserver جدید می‌سازد.
🔹 کار این ابزار: تشخیص این‌که یک المان وارد دید (viewport) کاربر شد یا نه
🔹 داخل پرانتز، یک تابع می‌نویسیم که همیشه وقتی المان دیده بشود، اجرا می‌شود.
🔹 entries لیستی از اطلاعات مربوط به مشاهده شدن المان‌هاست.
ساده‌تر:*/
const obs = new IntersectionObserver((entries) => {
  //«یه ناظر بساز که حواسش باشه کی این المان وارد دید کاربر میشه.»
  entries.forEach((e) => {
    //برای هر چیزی که ناظر دید، این کارها را انجام بده
    if (e.isIntersecting) {
      //اگر الان واقعاً دیده شد…»
      e.target.classList.add("show"); // مهم! کلاس را روی همان المانی بگذار که دیده شده
    }
  });
});
//تعریف obseve = «این المان را تحت نظر قرار بده تا بفهمی کی وارد صفحه می‌شود.»
section.forEach((sec) => {
  obs.observe(sec);
}); //چون لیست هست باید روی همه ی اونها این دستور observer اجرا بشه
//obs.observe(section); //از این لحظه به بعد، اگر آن بخش وارد دید کاربر شود، کد بخش قبلی اجرا می‌شود.
//obs.observe(section2); //از این لحظه به بعد، اگر آن بخش وارد دید کاربر شود، کد بخش قبلی اجرا می‌شود.
section2.forEach((sec) => {
  obs.observe(sec);
});

//نمایش نظرات
/*const button = document.querySelectorAll(".dot-small");
const commentuser = document.querySelectorAll(".users-comment");
//نمایش نظر پیش فرض
commentuser[0].style.display = "flex";
//نمایش دایره رنگی پیش فرض
button[0].style.backgroundColor = "black";
//روی هر کدوم از دکمه ها کلیک کرد
button.forEach((items, index) => {
  //بیاد روی اون دکمه رویداد کلیک اجرا شود
  items.addEventListener("click", () => {
    //اول همه دکمه بک گراند پیش فرض بگیرن
    button.forEach((item) => {
      item.style.backgroundColor = "rgba(79,93,117,.15)";
    });
    //بعدش همه استایل هاشون مخفی بشود
    commentuser.forEach((item) => {
      item.style.display = "none";
    });
    //اگر index 3 بود باید دایره 4 مشکی شود چون از 0 شروع میشود
    button[index].style.backgroundColor = "black";
    //و اون شماره از ایندکس در این commentuser استیال flex بگیرد
    commentuser[index].style.display = "flex";
  });
});*/

const button = document.querySelectorAll(".dot-small");
const commentuser = document.querySelectorAll(".users-comment");

// مقدار اولیه
let currentIndex = 0;
commentuser[0].style.display = "flex";
button[0].style.backgroundColor = "black";

let autoSlide = true; // تا وقتی کاربر کلیک نکرد

// روی هر دکمه کلیک کرد
button.forEach((items, index) => {
  items.addEventListener("click", () => {
    autoSlide = false; // کاربر کلیک کرد → اسلایدر خودکار متوقف شود

    button.forEach((item) => {
      item.style.backgroundColor = "rgba(79,93,117,.15)";
    });

    commentuser.forEach((item) => {
      item.style.display = "none";
    });

    button[index].style.backgroundColor = "black";
    commentuser[index].style.display = "flex";

    currentIndex = index; // ایندکس فعلی را به کلیک‌شده تغییر بده
  });
});

// اسلایدر خودکار هر 3 ثانیه
setInterval(() => {
  if (!autoSlide) return; // اگر کاربر کلیک کرد → اجرا نشود

  // همه را ریست کن
  button.forEach((item) => {
    item.style.backgroundColor = "rgba(79,93,117,.15)";
  });
  commentuser.forEach((item) => {
    item.style.display = "none";
  });

  // ایندکس بعدی  , ایندکس هر بار یکی زیاد شود
  // //وقتی به آخر رسیدیم، برگردیم به اول
  //این همان عملگر باقیمانده‌ی تقسیم است.
  //اگر تعداد آیتم‌ها 4 باشد (index: 0 تا 3)، فرم زیر اتفاق می‌افتد:
  /*0 + 1 = 1      →  1 % 4 = 1
    1 + 1 = 2      →  2 % 4 = 2
    2 + 1 = 3      →  3 % 4 = 3
    3 + 1 = 4      →  4 % 4 = 0   ‼ اینجاست که برمی‌گردیم به اول*/
  currentIndex = (currentIndex + 1) % commentuser.length;

  // نمایش مورد جدید
  button[currentIndex].style.backgroundColor = "black";
  commentuser[currentIndex].style.display = "flex";
}, 3000);

//نمایش بیشتر متن ها
const butmoretext = document.querySelector(".more-button-main-page9");
const textmore = document.querySelectorAll(".text-more-main-page9");
let isOpen = false;
butmoretext.addEventListener("click", () => {
  isOpen = !isOpen; //مقدار این متغییر اگر مثلا true هست بشود false یا برعکس
  if (isOpen == true) {
    butmoretext.textContent = "بستن";
    textmore.forEach((item) => {
      item.style.display = "block";
    });
  } else {
    butmoretext.textContent = "مشاهده بیشتر";
    textmore.forEach((item) => {
      item.style.display = "none";
    });
  }
});

//باز شدن منو همبرگری
document.addEventListener("DOMContentLoaded", function () {
  //وقتی dom ما لود شد این فانکشن هم اجرا بشه
  const btn = document.getElementById("menu-btn"); //گرفتن المنت های مورد نظر
  const menu = document.getElementById("open-menu");
  const close = document.getElementById("but-close");
  btn.addEventListener("click", function () {
    //وقتی روی این المنت کلیک کرد
    menu.classList.toggle("active"); //این المنت به صورت تاگلی این کلاس بگیره
  });
  close.addEventListener("click", () => {
    //اگر روی این کلیک کرد
    menu.classList.toggle("active"); //این المنت به صورت تاگلی این کلاس بگیره
  });
});

const buttontop = document.querySelector(".but-top-page"); //تعریف المنت
window.addEventListener("scroll", () => {
  //روی صفحه وب وقتی اسکرول اتفاق افتاد
  if (window.scrollY > 10) {
    //بیاد بگه اسکرول عمودی اگر بیش از 10 بود
    buttontop.style.display = "block"; //دکمه نمایش بده
  } else {
    //در غیر این صورت
    buttontop.style.display = "none"; //دکمه مخفی بشه
  }
});
buttontop.addEventListener("click", () => {
  //اگر روی دکمه کلیک شد
  window.scrollTo({ top: 0, behavior: "smooth" }); //بیاد صفحه مون بره به اول صفحه و این اتافق ارام انجام شود نه یهویی
});

const elemload = document.querySelector(".loader-wrapper");
const main = document.querySelector("main");
window.addEventListener("load", () => {
  elemload.style.display = "block";
  setTimeout(() => {
    elemload.style.display = "none";
    main.style.display = "flex";
  }, 5000);
});
