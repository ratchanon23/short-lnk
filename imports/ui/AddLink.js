import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react'
import Modal from 'react-modal'

class AddLink extends Component {
    constructor(props) {
        super(props)

        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }

    onSubmit(e) {
        e.preventDefault()
        // const url = this.refs.url.value.trim()
        const { url } = this.state
        Meteor.call('links.insert', url, (err, res) => {
            if(!err) {
                this.handleModalClose()
            } else {
                this.setState({error: err.reason})
            }
        })
    }

    onChange(e) {
        this.setState({
            url: e.target.value.trim()
        })
    }
    
    handleModalClose() {
        this.setState({url: '', isOpen: false, error: ''})
    }

    render() {
        return (
            <div>
                <button className='button' onClick={() => this.setState({ isOpen: true }) }>+ Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel='Add Link'
                    onAfterOpen={() => {this.refs.url.focus()}}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className='boxed-view__box'
                    overlayClassName='boxed-view boxed-view--modal'
                >
                    <h1> Add Link </h1>
                    {!this.state.error ? undefined : <p> {this.state.error} </p>}
                    <form onSubmit={this.onSubmit.bind(this)} className='boxed-view__form'>
                        <input
                            onChange={this.onChange.bind(this)}
                            type='text'
                            ref='url'
                            placeholder='URL'
                            value={this.state.url}
                        />
                        <button className='button'> Add Link </button>
                        <button type='button' onClick={this.handleModalClose.bind(this)} className='button button--secondary'> Cancel </button>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default AddLink