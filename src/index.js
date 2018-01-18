import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from "youtube-api-search";
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideDetail from './components/video_detail';

const API_KEY = 'AIzaSyDTE7XLpH31KO3RbQhqCyOxAEXSnxnba-8';
/* Create a new component. 
 * This component should produce some HTML.
 * Functional component: this is used when we are taking in data and spitting out jsx.
 * it can contain class based components
*/
/* 
    const App = () => { 
        return (
            //use jsx to call the Class based component
            <div>
                <SearchBar />
            </div>
        ); 
    }
*/

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards')
    }

    videoSearch(term) {

        YTSearch({ key: API_KEY, term: term }, (videos) => {
            /* 
             * ES6 syntax this.setState({videos}) == this.setState({videos: videos}); 
             * only works when the key and value are the same name
            */
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        }); 

    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}


//Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));