import { Component } from 'react';
import React from  'react';
import './DaySlide.css';

class DaySlide extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        const data = this.props.location.data.data
        this.state = {
            activeID: 0,
            wrapperStyle: {
                backgroundImage: `url('${data[0].img}')`
            },
            panelStyle: {
                background: data[0].colour
            },
            buttonHover: false,
            buttonStyle: {
                color: '#ffffff'
            },
            data:data
        };
    }
    _changeActive(id) {
        console.log('_changeActive',typeof (this.state.data))
        this.setState({
            activeID: id,
            wrapperStyle: {
                backgroundImage: `url(${this.state.data[id].img})`
            },
            panelStyle: {
                backgroundColor: this.state.data[id].colour
            }
        });
    }
    _buttonColour() {
        if(!this.state.buttonHover){
            this.setState({
                buttonHover: true,
                buttonStyle: {
                    color: this.state.data[this.state.activeID].colour
                }
            });
        } else {
            this.setState({
                buttonHover: false,
                buttonStyle: {
                    color: '#ffffff'
                }
            });
        }
    }
    render() {
        return (
            <section className="wrapper" style={this.state.wrapperStyle}>
                <Selectors
                    data={this.state.data}
                    activeID={this.state.activeID}
                    _changeActive={this._changeActive.bind(this)}
                />
                <Panel
                    data={this.state.data[this.state.activeID]}
                    panelStyle={this.state.panelStyle}
                    buttonStyle={this.state.buttonStyle}
                    _buttonColour={this._buttonColour.bind(this)}
                />
            </section>
        );
    }
}
class Panel extends React.Component {
    render() {
        return (
            <aside className="panel" style={this.props.panelStyle}>
                <h2 className="panel-header">{this.props.data.header}</h2>
                <p className="panel-info">{this.props.data.body}</p>
                <button className="panel-button"
                        style={this.props.buttonStyle}
                        onMouseEnter={this.props._buttonColour}
                        onMouseLeave={this.props._buttonColour}>
                    Read More
                </button>
            </aside>
        );
    }
}
class Selectors extends Component {
    _handleClick(e) {
        if (this.props.id !== this.props.activeID) {
            this.props._changeActive(this.props.id);
        } else {
            return;
        }
    }
    render() {
        return (
            <div className="selectors">
                {this.props.data.map((item) =>
                    <Selector
                        key={item.id}
                        id={item.id}
                        _handleClick={this._handleClick}
                        _changeActive={this.props._changeActive}
                        activeID={this.props.activeID}
                    />
                )}
            </div>
        );
    }
}
class Selector extends Component {
    render() {
        let componentClass = 'selector';
        if (this.props.activeID === this.props.id) {
            componentClass = 'selector active';
        }
        return (
            <div className={componentClass} onClick={this.props._handleClick.bind(this)}><span className={"index"}>{this.props.id+1}</span></div>
        );
    }
}



export default DaySlide;