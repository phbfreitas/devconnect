import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
    const experiences = experience.map(exp => (
        <div>
            <h3 class="text-dark">{exp.company}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                {
                    exp.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </p>
            <p><strong>Position: </strong>{exp.title}</p>
            <p>
                <strong>Description: </strong>{exp.description}</p>
        </div>
    ));

    return (
        <Fragment>

            {(experiences !== null && experiences.length > 0) ? (
                <div class="profile-exp bg-white p-2">
                    <h2 class="text-primary">Experience</h2>
                    {experiences}
                </div>
            ) : (
                    <div class="profile-exp bg-white p-2">
                        <h2 class="text-primary">Experience</h2>
                        <h4>No Experiences have been added yet</h4>
                    </div>

                )}
        </Fragment>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired
}

export default ProfileExperience;