import React from 'react';
class Classcomp extends React.Component{
    constructor(props){
        super(props)
        console.log('name:', props.name)
        console.log('lastname:', props.lastname)
    }
    render(){
        console.log('RENDERRRR')
        return(
            <div>
                <h1>This is class component</h1>\
                <h2>{this.props.name}</h2>
            </div>
        )
    }
}

export default Classcomp