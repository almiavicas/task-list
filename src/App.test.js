import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';


describe('Loads the app', () => {
    test('App loads', () => {
        const component = renderer.create(<App />)
        const appTree = component.toJSON();
        console.log(appTree);
    })
    
})