import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import PropTypes from 'prop-types';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';


const Profile = ({
    getProfileById,
    profile: { profile, loading },
    auth,
    match
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : <Fragment>
                <Link to="/profiles" className='btn btn-light'>
                    Back To profiles
                </Link>
                {auth.isAuthenticated &&
                    !auth.loading &&
                    auth.user._id === profile.user._id &&
                    (
                        <Link to='/edit-profile' className='btn btn-dark'>
                            Edit Profile
                        </Link>
                    )}
                <div class="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileExperience experience={profile.experience} />
                    <ProfileEducation education={profile.education} />
                    <ProfileGithub username={profile.githubusername} />
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
