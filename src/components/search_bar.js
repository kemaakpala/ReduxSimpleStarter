import React, { Component } from 'react';

//class based component
class SearchBar extends Component {
    constructor(props) {
        super(props);

        //initialise state in a class based component
        this.state = { term: '' };
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    //Controlled Element: the value is set by the state. initial vavlue will be ''.
                    value={this.state.term} 
                    /*
                     * 1. State is updated when there is a change on the element. 
                     * 2. When the user types in the input the value of the input does not change untill the event is triggered. 
                     * 2. This then causes the component to rerender, 
                     * 3. which then updates the state.
                    */
                    onChange={ event => this.onInputChange(event.target.value)} />
            </div>
        );

    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

}


export default SearchBar;
