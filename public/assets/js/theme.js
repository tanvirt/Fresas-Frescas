function Theme() {}

Theme.init = function () {

    // Project Photo Upload
    $(function() {
        $("#project-photo-upload").fileinput({
            initialPreview: [
                "../../assets/img/ideal_workplace.jpg"
            ],
            initialPreviewAsData: true,
            previewFileType: "image",
            browseClass: "btn btn-success",
            browseLabel: "Pick Image",
            browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
            removeClass: "btn btn-danger",
            removeLabel: "Delete",
            removeIcon: "<i class=\"glyphicon glyphicon-trash\"></i> ",
            uploadClass: "btn btn-info",
            uploadLabel: "Upload",
            uploadIcon: "<i class=\"glyphicon glyphicon-upload\"></i> ",
            showCaption: false,
        });
    });

    // Navigation Scripts to Show Header on Scroll-Up
    jQuery(document).ready(function($) {
        var MQL = 1170;

        // primary navigation slide-in effect
        if($(window).width() > MQL) {
            var headerHeight = $('.navbar-custom').height();
            $(window).on('scroll', {
                    previousTop: 0
                },
                function() {
                    var currentTop = $(window).scrollTop();
                    // check if user is scrolling up
                    if(currentTop < this.previousTop) {
                        // if scrolling up...
                        if(currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                            $('.navbar-custom').addClass('is-visible');
                        } 
                        else {
                            $('.navbar-custom').removeClass('is-visible is-fixed');
                        }
                    } 
                    else if(currentTop > this.previousTop) {
                        // if scrolling down...
                        $('.navbar-custom').removeClass('is-visible');
                        if(currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) {
                            $('.navbar-custom').addClass('is-fixed');
                        }
                    }
                    this.previousTop = currentTop;
                }
            );
        }
    });

}
