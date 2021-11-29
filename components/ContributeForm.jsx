import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from '../ethereum/campaign';
import web3 from "../ethereum/web3";
import { Router } from '../routes';

export default ({ address }) => {

    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setLoading(true);

        const campaign = await Campaign(address);

        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });

            Router.replaceRoute(`/campaigns/${address}`);
        } catch (error) {
            setMessage(error.message);
        }
        setValue('');
        setLoading(false);
    }

    return (
        <Form onSubmit={onSubmit} error={!!message}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input label='ether' labelPosition='right' value={value} onChange={Event => setValue(Event.target.value)} />
            </Form.Field>
            <Message error header='Oop, something went wrong!' content={message} />
            <Button primary loading={loading} disabled={loading}>Contribute!</Button>
        </Form>

    );
};