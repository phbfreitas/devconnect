import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: {
    user: { name },
    bio,
    skills
}
}) => {
    return (
        <Fragment>
            <div class="profile-about bg-light p-2">
                <h2 class="text-primary">{name.split(' ').splice(0, 1)}{`'s Bio`}</h2>
                <p>{bio}</p>
                <div class="line"></div>
                <h2 class="text-primary">Skill Set</h2>
                <div class="skills">
                    {skills.map((skill, index) => (
                        <div key={index} class="p-1"><i class="fa fa-check"></i>{' '}{skill}</div>
                    ))}
                </div>
            </div>

        </Fragment>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout;