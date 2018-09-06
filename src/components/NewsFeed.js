import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Card from './Card';
import Title from './Title';
import '../style/newsfeed.scss';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

class NewsFeed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: {}
        }
    }

    componentWillMount() {
        const PostsData = [
            {
              "category": "News",
              "title": "CNN Acquire BEME",
              "text": "CNN purchased Casey Neistat's Beme app for $25million.",
              "image": "https://source.unsplash.com/user/erondu/600x400"
            },
            {
              "category": "Travel",
              "title": "Nomad Lifestyle",
              "text": "Learn our tips and tricks on living a nomadic lifestyle",
              "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
            },
            {
              "category": "Development",
              "title": "React and the WP-API",
              "text": "The first ever decoupled starter theme for React & the WP-API",
              "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
            },
            {
              "category": "News",
              "title": "CNN Acquire BEME",
              "text": "CNN purchased Casey Neistat's Beme app for $25million.",
              "image": "https://source.unsplash.com/user/erondu/600x400"
            },
            {
              "category": "Travel",
              "title": "Nomad Lifestyle",
              "text": "Learn our tips and tricks on living a nomadic lifestyle",
              "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
            },
            {
              "category": "Development",
              "title": "React and the WP-API",
              "text": "The first ever decoupled starter theme for React & the WP-API",
              "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
            }
          ]
          
        this.setState({
          posts: PostsData
        });
    }    

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        
        return (
            
            <div>
                <MuiThemeProvider>
                <div id="outerDiv"> 
                    <NavBar />

                    <div style={{ margin: 20 }}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={`/`}>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>NewsFeed</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <Title />
                    <div className="app-card-list">
                        {
                        Object
                        .keys(this.state.posts)
                        .map(key => <Card key={key} index={key} details={this.state.posts[key]}/>)
                        }
                    </div>

                </div>
                </MuiThemeProvider>
            </div>
        );
    };
    
};

export default NewsFeed;
