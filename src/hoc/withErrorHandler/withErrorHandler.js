import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }
        componentWillMount() {
            this.reqInterceptor = 
            axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            })
            this.resInterceptor = 
            axios.interceptors.response.use(res => res, error => { //get error from firebase db, if res, then return res quick and avoid error
                this.setState({error:error})

            });
        }
        componentWillUnmount() {
            console.log('will unmount', this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({error:null})
        }
        render() {
            return (
            <Auxiliary>
                <Modal show={this.state.error}
                modalClosed={this.errorConfirmedHandler}>
                    {/* //firebase will return error if state not null */}
                    {this.state.error ? this.state.error.message : null} 
                </Modal>
                <WrappedComponent {...this.props} />
            </Auxiliary>
           
            )
        }
        
    }
}

export default withErrorHandler;