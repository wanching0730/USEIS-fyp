import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../style/faq.css';
import $ from 'jquery';

class Faq extends Component {

    componentDidMount() {

        window.scrollTo(0, 0);

        $(document).ready(function($){
            //update these values if you change these breakpoints in the style.css file (or _layout.scss if you use SASS)
            var MqM= 768,
                MqL = 1024;
        
            var faqsSections = $('.cd-faq-group'),
                faqTrigger = $('.cd-faq-trigger'),
                faqsContainer = $('.cd-faq-items'),
                faqsCategoriesContainer = $('.cd-faq-categories'),
                faqsCategories = faqsCategoriesContainer.find('a'),
                closeFaqsContainer = $('.cd-close-panel');
            
            //select a faq section 
            faqsCategories.on('click', function(event){
                event.preventDefault();
                var selectedHref = $(this).attr('href'),
                    target= $(selectedHref);
                if( $(window).width() < MqM) {
                    faqsContainer.scrollTop(0).addClass('slide-in').children('ul').removeClass('selected').end().children(selectedHref).addClass('selected');
                    closeFaqsContainer.addClass('move-left');
                    $('body').addClass('cd-overlay');
                } else {
                    if(target.length) {
                        $('body,html').animate({ 'scrollTop': target.offset().top - 19}, 200); 
                    } 
                }
            });
        
            //close faq lateral panel - mobile only
            $('body').bind('click touchstart', function(event){
                if( $(event.target).is('body.cd-overlay') || $(event.target).is('.cd-close-panel')) { 
                    closePanel(event);
                }
            });
            faqsContainer.on('swiperight', function(event){
                closePanel(event);
            });
        
            //show faq content clicking on faqTrigger
            faqTrigger.on('click', function(event){
                event.preventDefault();
                $(this).next('.cd-faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');
            });
        
            //update category sidebar while scrolling
            $(window).on('scroll', function(){
                if ( $(window).width() > MqL ) {
                    (!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory); 
                }
            });
        
            $(window).on('resize', function(){
                if($(window).width() <= MqL) {
                    faqsCategoriesContainer.removeClass('is-fixed').css({
                        '-moz-transform': 'translateY(0)',
                        '-webkit-transform': 'translateY(0)',
                        '-ms-transform': 'translateY(0)',
                        '-o-transform': 'translateY(0)',
                        'transform': 'translateY(0)',
                    });
                }	
                if( faqsCategoriesContainer.hasClass('is-fixed') ) {
                    faqsCategoriesContainer.css({
                        'left': faqsContainer.offset().left,
                    });
                }
            });
        
            function closePanel(e) {
                e.preventDefault();
                faqsContainer.removeClass('slide-in').find('li').show();
                closeFaqsContainer.removeClass('move-left');
                $('body').removeClass('cd-overlay');
            }
        
            function updateCategory(){
                updateCategoryPosition();
                updateSelectedCategory();
            }
        
            function updateCategoryPosition() {
                if($('.cd-faq').length > 0) {
                    var top = $('.cd-faq').offset().top,
                    height = $('.cd-faq').height() - $('.cd-faq-categories').height(),
                    margin = 20;
                }
                
                if( top - margin <= $(window).scrollTop() && top - margin + height > $(window).scrollTop() ) {
                    var leftValue = faqsCategoriesContainer.offset().left,
                        widthValue = faqsCategoriesContainer.width();
                    faqsCategoriesContainer.addClass('is-fixed').css({
                        'left': leftValue,
                        'top': margin,
                        '-moz-transform': 'translateZ(0)',
                        '-webkit-transform': 'translateZ(0)',
                        '-ms-transform': 'translateZ(0)',
                        '-o-transform': 'translateZ(0)',
                        'transform': 'translateZ(0)',
                    });
                } else if( top - margin + height <= $(window).scrollTop()) {
                    var delta = top - margin + height - $(window).scrollTop();
                    faqsCategoriesContainer.css({
                        '-moz-transform': 'translateZ(0) translateY('+delta+'px)',
                        '-webkit-transform': 'translateZ(0) translateY('+delta+'px)',
                        '-ms-transform': 'translateZ(0) translateY('+delta+'px)',
                        '-o-transform': 'translateZ(0) translateY('+delta+'px)',
                        'transform': 'translateZ(0) translateY('+delta+'px)',
                    });
                } else { 
                    faqsCategoriesContainer.removeClass('is-fixed').css({
                        'left': 0,
                        'top': 0,
                    });
                }
            }
        
            function updateSelectedCategory() {
                faqsSections.each(function(){
                    if(parseInt($('.cd-faq-title') != null)) {
                        var actual = $(this),
                        margin = parseInt($('.cd-faq-title').eq(1).css('marginTop').replace('px', '')),
                        activeCategory = $('.cd-faq-categories a[href="#'+actual.attr('id')+'"]'),
                        topSection = (activeCategory.parent('li').is(':first-child')) ? 0 : Math.round(actual.offset().top);
                    }
                    
                    if(actual != null) {
                        if ( ( topSection - 20 <= $(window).scrollTop() ) && ( Math.round(actual.offset().top) + actual.height() + margin - 20 > $(window).scrollTop() ) ) {
                            activeCategory.addClass('selected');
                        }else {
                            activeCategory.removeClass('selected');
                        }
                    }
                    
                });
            }
        });
    }

    render() {
        return (

            <div>

                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>FAQ</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="cd-faq">
                <ul className="cd-faq-categories">
                    <li><a className="selected" href="#basics">Basics</a></li>
                    <li><a href="#mobile">Society</a></li>
                    <li><a href="#account">Event</a></li>
                    <li><a href="#payments">Profile</a></li>
                    <li><a href="#privacy">Authorization</a></li>
                </ul> 
            
                <div className="cd-faq-items">
                    <ul id="basics" className="cd-faq-group">
                        <li className="cd-faq-title"><h2>Basics</h2></li>
                        <li>
                            <a className="cd-faq-trigger" href="#0">What is my username and password</a>
                            <div className="cd-faq-content">
                                <p>The username and password are following the UTAR Portal authentication.</p>
                            </div> 
                        </li>
            
                        <li>
                            <a className="cd-faq-trigger" href="#0">How do I register?</a>
                            <div className="cd-faq-content">
                                <p>There is no registration. The account should be created at the beginning by the department. </p>
                            </div> 
                        </li>
            
                        <li>
                            <a className="cd-faq-trigger" href="#0">How do I make payment for society and event registration?</a>
                            <div className="cd-faq-content">
                                <p>Payment is excluded from this system. Please contact the respective person in charged to make payment.</p>
                            </div> 
                        </li>
        
                    </ul> 
            
                    <ul id="mobile" className="cd-faq-group">
                        <li className="cd-faq-title"><h2>Society</h2></li>
                        <li>
                            <a className="cd-faq-trigger" href="#0">Can I receive notification from registered society?</a>
                            <div className="cd-faq-content">
                                <p>Yes, you can allow the notification during the society registration.</p>
                            </div> 
                        </li>
            
                        <li>
                            <a className="cd-faq-trigger" href="#0">Can I register as a society member of any interested society?</a>
                            <div className="cd-faq-content">
                                <p>Yes, you can register as society member in this system and wait for the people in-charged to approve your registration. But payment is excluded in this sytem.</p>
                            </div> 
                        </li>
            
                    </ul> 
            
                    <ul id="account" className="cd-faq-group">
                        <li className="cd-faq-title"><h2>Event</h2></li>
                        <li>
                            <a className="cd-faq-trigger" href="#0">Can I receive notification from registered event?</a>
                            <div className="cd-faq-content">
                                <p>Yes, you can allow the notification during event registration. The notification will be sent to you as a reminder before the actual day of the event.</p>
                            </div> 
                        </li>
            
                        <li>
                            <a className="cd-faq-trigger" href="#0">Can I register as an event crew of any interested event?</a>
                            <div className="cd-faq-content">
                                <p>Yes, you can register as an event crew in this system and wait for the people in-charged to approve your registration. But payment is excluded in this sytem.</p>
                            </div> 
                        </li>

                        <li>
                            <a className="cd-faq-trigger" href="#0">Can I provide rating for the events that I had participated?</a>
                            <div className="cd-faq-content">
                                <p>Yes, you can rate for any event that you had participated before from your profile.</p>
                            </div> 
                        </li>
            
                    </ul> 
            
                    <ul id="payments" className="cd-faq-group">
                        <li className="cd-faq-title"><h2>My Profile</h2></li>
                        <li>
                            <a className="cd-faq-trigger" href="#0">Can I cancel the registration that I had made before?</a>
                            <div className="cd-faq-content">
                                <p>Yes, you can cancel the registration that you have made before such as event and crew registration from your profile.</p>
                            </div> 
                        </li>
            
                        <li>
                            <a className="cd-faq-trigger" href="#0">As a executive committee of a society, can I manage my own society in this system?</a>
                            <div className="cd-faq-content">
                                <p>Yes, you can manage your own profile if the authorization is given to you based on your position. You can manage your the profile, members, events and event crews of your society.</p>
                            </div> 
                        </li>
        
                    </ul> 
            
                    <ul id="privacy" className="cd-faq-group">
                        <li className="cd-faq-title"><h2>Authorization</h2></li>
                        <li>
                            <a className="cd-faq-trigger" href="#0">What kind of authorization is allowed in managing the society?</a>
                            <div className="cd-faq-content">
                                <p>Only specific position of society committees is allowed to manage the society. For example, Chairperson, Secretary and Publicity Manager are allowed to manage the respective societies in this system to ensure the security. </p>
                            </div> 
                        </li>
            
                        <li>
                            <a className="cd-faq-trigger" href="#0">Can I change the username of my account in this system?</a>
                            <div className="cd-faq-content">
                                <p>No, you are not allowed to do this. Because the account is linked with UTAR authentiction. Hence, only student ID is allowed to be used as the login username in this system.</p>
                            </div> 
                        </li>
            
                    </ul> 
            
                </div> 
                <a href="#0" className="cd-close-panel">Close</a>
            </div> 
        </div>
                
        );    
    }
}

export default Faq;
