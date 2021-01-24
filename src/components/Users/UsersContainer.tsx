import React from 'react';
import {useSelector} from 'react-redux';
import Users from './Users';
import Loader from '../Loader/Loader';
import {getIsFetching,} from '../../redux/users-selectors';


type UsersPagePropsType = {

}

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return (
     <>
         {isFetching ? <Loader/> : null }
         <Users />

     </>
 );
}

export default UsersPage

