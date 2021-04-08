import React, { Component } from "react";
import Collapsible from 'react-collapsible';
import { render } from 'react-dom';


export default class ProfileInfo extends React.Component{
    render(){
        return (
            <div>
                <p>
                <iframe src="https://docs.google.com/document/d/e/2PACX-1vSewkITBoEz3KeiQXvwrakCWwb7W-iAIPJliai9nG6XLIkF1HBiJvfaa6gHkQquACTjukBmbGAwFvq4/pub?embedded=true" width="100%" height="300"></iframe>
                <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQK1kVdC4296NNeal8wL7HCmUu1UnfwMIuIuzInsjOPqm1L4gzs3dQ3uzdk6Zt-KBd1YaQTpnkO675m/pubhtml?widget=true&amp;headers=false" width="100%" height="300"></iframe>                    
                </p>
            </div>
        );
    }
}