import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

export default (props) => (
    <Container>
        <Header />
        {props.children}
    </Container>
);