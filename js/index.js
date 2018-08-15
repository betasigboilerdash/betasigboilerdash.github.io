/**
 * Created by bscholer on 4/2/18.
 */
// $("#home > div:gt(0)").hide();
//
// setInterval(function() {
//     $('#home > div:first')
//         .fadeOut(1000)
//         .next()
//         .fadeIn(1000)
//         .end()
//         .appendTo('#slideshow');
// },  5000);
$('#myContainer').fullpage({
    // anchors: ['home', 'about', 'league-info', 'register', 'tournaments'],
    resize: false,
    animateAnchor: false,
    autoScrolling: true,
    responsive: 900,
    fitSection: false,
    menu: '#menu',
    paddingTop: '20px',
    css3: true,
    onLeave: function(index, nextIndex, direction){
    },
    afterLoad: function(anchorLink, index){
    },
    afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
    },
    onSlideLeave: function(anchorLink, index, slideIndex, direction){
    },
    afterRender: function(){
    },
    afterResize: function(){
    }
});