// protfolio filters
$(window).on("load", function () {
  var t = $(".portfolio-container");
  t.isotope({
    filter: ".soft_dev",
    animationOptions: {
      duration: 750,
      easing: "linear",
      queue: !1,
    },
  }),
    $(".filters a").click(function () {
      $(".filters .active").removeClass("active"), $(this).addClass("active");
      var i = $(this).attr("data-filter");
      return (
        t.isotope({
          filter: i,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1,
          },
        }),
        !1
      );
    });
});

// SlideShow
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Get the modal
var img_status = false;
var video_status = false;
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("slider-image");
var modalVid = document.getElementById("slider-video");
var span_image = document.getElementsByClassName("modal-content")[0];

function modelLinkCreator(name, link) {
  let div_node = document.createElement("div");
  let text_node = document.createElement("h3");
  let button_node = document.createElement("button");
  let span1_node = document.createElement("span");
  let span2_node = document.createElement("span");
  let span3_node = document.createElement("span");
  let a_node = document.createElement("a");

  div_node.className = "model_link_div_class";
  div_node.id = "model_link_div_id";
  text_node.className = "model_link_text";
  button_node.id = "learn-more-id";
  button_node.className = "learn-more";
  span1_node.className = "lm-circle";
  span1_node.ariaHidden = "true";
  span2_node.className = "lm-icon lm-arrow";
  span3_node.className = "lm-button-text";
  a_node.href = link;
  a_node.target = "_blank";

  if (name !== "") {
    text_node.appendChild(document.createTextNode(name));
    div_node.appendChild(text_node);
  }

  if (link !== "") {
    span3_node.appendChild(document.createTextNode("MORE INFO"));
    span1_node.appendChild(span2_node);
    button_node.appendChild(span1_node);
    button_node.appendChild(span3_node);
    a_node.appendChild(button_node);
    div_node.appendChild(a_node);
  }
  return div_node;
}

function mainTitleCreator(data) {
  let main_title = "";
  if (/\<([^)]+)\>/i.test(data)) {
    main_title = data.match(/\<([^)]+)\>/)[1];
  }
  if (main_title !== "") {
    let div_node = document.createElement("div");
    let title_node = document.createElement("h2");
    div_node.className = "model_title_div_class";
    div_node.id = "model_title_div_id";
    title_node.className = "model_title_text";
    title_node.appendChild(document.createTextNode(main_title));
    div_node.appendChild(title_node);
    return div_node;
  }
  return null;
}

function generateLinkList(data) {
  let linkList = [];
  const mainListArray = data.split("^");
  mainListArray.forEach((element, i) => {
    let temp_name = "";
    let temp_link = "";
    if (/\(([^)]+)\)/i.test(element)) {
      temp_name = element.match(/\(([^)]+)\)/)[1];
    }
    if (/\{([^)]+)\}/i.test(element)) {
      temp_link = element.match(/\{([^)]+)\}/)[1];
    }
    linkList.push(modelLinkCreator(temp_name, temp_link));
  });
  return linkList;
}

function reset_video_model() {
  modalVid.pause();
  if (document.getElementById("slider-video-source") !== null) {
    document.getElementById("slider-video-source").remove();
  }
  modalVid.load();
}

function openImgCert(details, modal_type = null) {
  let image = details;

  while (document.getElementById("model_link_div_id") !== null) {
    document.getElementById("model_link_div_id").remove();
  }
  if (document.getElementById("model_title_div_id") !== null) {
    document.getElementById("model_title_div_id").remove();
  }
  reset_video_model();

  if (image.src !== undefined) {
    var source = image.src;
  } else {
    var source = image.getElementsByTagName("img")[0].src;
    let mainTitle = mainTitleCreator(image.getElementsByTagName("img")[0].alt);
    let linkList = generateLinkList(image.getElementsByTagName("img")[0].alt);
    if (mainTitle !== null) {
      document
        .getElementById("myModal")
        .insertBefore(mainTitle, document.getElementById("slider-image"));
    }
    linkList.forEach((element) => {
      document.getElementById("myModal").appendChild(element);
    });
    if (modal_type === "gif") {
      let temp_index = source.lastIndexOf("/");
      source = source.slice(0, temp_index) + "/gifs" + source.slice(temp_index);
      if (/.png/i.test(source) === true) {
        source = source.replace("png", "gif");
      } else if (/.jpg/i.test(source) === true) {
        source = source.replace("jpg", "gif");
      } else if (/.webp/i.test(source) === true) {
        source = source.replace("webp", "gif");
      }
    } else if (modal_type === "video") {
      let temp_index = source.lastIndexOf("/");
      source =
        source.slice(0, temp_index) + "/videos" + source.slice(temp_index);
      if (/.png/i.test(source) === true) {
        source = source.replace("png", "mp4");
      } else if (/.jpg/i.test(source) === true) {
        source = source.replace("jpg", "mp4");
      } else if (/.webp/i.test(source) === true) {
        source = source.replace("webp", "mp4");
      }
    } else if (modal_type === "image") {
      let temp_index = source.lastIndexOf("/");
      source =
        source.slice(0, temp_index) + "/images" + source.slice(temp_index);
    }
  }
  document.querySelector("body").classList.add("disable-scroll");
  modal.style.display = "block";
  modalImg.style.display = "";
  modalVid.style.display = "none";

  if (modal_type === "gif") {
    modalImg.src = source;
  } else if (modal_type === "video") {
    modalVid.style.display = "";
    modalImg.style.display = "none";
    let video_source = document.createElement("source");
    video_source.id = "slider-video-source";
    video_source.src = source;
    video_source.type = "video/mp4";
    modalVid.appendChild(video_source);
  } else {
    modalImg.src = source;
  }
}

span_image.onclick = function () {
  img_status = true;
};

modalVid.onclick = function () {
  video_status = true;
};

modal.onclick = function () {
  if (!img_status && !video_status) {
    modal.style.display = "none";
    modalImg.src = "";
    document.querySelector("body").classList.remove("disable-scroll");
  }
  img_status = false;
  video_status = false;
};

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot_active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " dot_active";
}

window.addEventListener("load", function () {
  document.getElementById("loading").style.display = "none";
  document.querySelector("body").classList.remove("disable-scroll");
});
