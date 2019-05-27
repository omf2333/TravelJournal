import React from 'react';
import { Component } from 'react';

class ArticleDisplay extends Component{
    render() {
        const articleContent = this.props.article;
        return(
            <div>
                <div className="bg">
                    <i className="bg-image"></i>
                </div>
                    <div className = "main-wrapper" >
                        <div className = "blog-post-wrapper" >
                            <div className = "blog-post" >
                                <figure className = "blog-post--image" >
                                    < img src = "https://deghq.com/yapp/front-labs/codepen-assets/bmw-M4.jpg" alt = "" />
                                </figure>
                                <div>
                                    {articleContent}
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default ArticleDisplay;