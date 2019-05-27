import classNames from 'classnames';
import { Component } from 'react';
import {Avatar }  from 'antd'
import React from  'react';
import './CitiesSlider.css';
import { Link } from 'react-router-dom'
class CitiesSlider extends Component {
    constructor(props) {
        super(props);
        this.IMAGE_PARTS = 4;
        this.changeTO = null;
        this.AUTOCHANGE_TIME = 4000;
        this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
    }

    componentWillUnmount() {
        window.clearTimeout(this.changeTO);
    }

    componentDidMount() {
        this.runAutochangeTO();
        setTimeout(() => {
            this.setState({ activeSlide: 0, sliderReady: true });
        }, 0);
    }

    runAutochangeTO() {
        this.changeTO = setTimeout(() => {
            this.changeSlides(1);
            this.runAutochangeTO();
        }, this.AUTOCHANGE_TIME);
    }

    changeSlides(change) {
        window.clearTimeout(this.changeTO);
        const { length } = this.props.slides;
        const prevSlide = this.state.activeSlide;
        let activeSlide = prevSlide + change;
        if (activeSlide < 0) activeSlide = length - 1;
        if (activeSlide >= length) activeSlide = 0;
        this.setState({ activeSlide, prevSlide });
    }

    render() {
        const { activeSlide, prevSlide, sliderReady } = this.state;
        return (
            <div className={classNames('slider', { 's--ready': sliderReady })}>
                <p className="slider__top-heading">Travelers</p>

                <div className="slider__slides">
                    {this.props.slides.map((slide, index) => (
                        <div
                            className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
                            key={slide.city}
                        >
                            <div className="slider__slide-content">
                                <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3>
                                <h2 className="slider__slide-heading">
                                    {slide.city.split('').map(l => <span>{l}</span>)}
                                </h2>
                                <Link style={{ textDecoration: 'none' ,color:'#fff'}} to={{pathname: '/daysSlide', data:{data}}}><p className="slider__slide-readmore">read more</p></Link>
                            </div>
                            <div className="slider__slide-parts">
                                {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                                    <div className="slider__slide-part" key={i}>
                                        <div className="slider__slide-part-inner" style={{ backgroundImage:  `url(${slide.img})`}} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="slider__control" onClick={() => this.changeSlides(-1)} />
                <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
            </div>
        );
    }
}
const data = [{
    id: 0,
    header: 'Gluten-free Bicycle',
    body: 'Chillwave knausgaard chambray flannel tumblr, narwhal microdosing blog...',
    colour: '#242846',
    img: 'http://ghj.nanjing.gov.cn/bmdt/gzdt/201812/W020181225587316961691_340.jpg'
}, {
    id: 1,
    header: 'Post-ironic Disrupt',
    body: 'Swag biodiesel disrupt retro fashion, salvia food truck kitsch wolf DIY...',
    colour: '#ba9077',
    img: 'http://t2.hddhhn.com/uploads/tu/201705/9999/3f9e5401d9.jpg'
}, {
    id: 2,
    header: 'Lumber-Sexual Roof Party ',
    body: 'Flexitarian 3 wolf moon cliche, migas scenester street art...',
    colour: '#1ABC9C',
    img: 'http://t2.hddhhn.com/uploads/tu/201705/9999/3f9e5401d9.jpg'
}, {
    id: 3,
    header: 'Vegan hoodie trust fund',
    body: 'Farm-to-table tousled try-hard, normcore ethical tilde iPhone...',
    colour: '#C0392B',
    img: 'http://t2.hddhhn.com/uploads/tu/201705/9999/3f9e5401d9.jpg'
}, {
    id: 4,
    header: 'cliche craft beer',
    body: 'Tote bag flannel normcore polaroid +1. Quinoa actually 90s sustainable...',
    colour: '#513B56',
    img:'http://t2.hddhhn.com/uploads/tu/201705/9999/3f9e5401d9.jpg'
}];
export default CitiesSlider;

//"url(" + require('../Img/City/Hongkong.jpg') + ")"