import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education }) => {
    const educations = education.map(edu => (
        <div>
            <h3>{edu.school}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                {
                    edu.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
                }
            </p>
            <p><strong>Degree: </strong>{edu.degree}</p>
            <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
            <p><strong>Description: </strong>{edu.description}</p>
        </div>
    ));

    return (
        <Fragment>
            {(educations !== null && educations.length > 0) ? (
                <div class="profile-edu bg-white p-2">
                    <h2 class="text-primary">Education</h2>
                    {educations}
                </div>
            ) : (
                    <div class="profile-edu bg-white p-2">
                        <h2 class="text-primary">Education</h2>
                        <h4>No Education has been added yet</h4>
                    </div>
                )}
        </Fragment>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired
}

export default ProfileEducation;