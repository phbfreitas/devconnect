import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({ profile: {
    user: { name, avatar },
    status,
    company,
    website,
    location,
    social
}
}) => {
    return (
        <Fragment>
            <div className="profile-top bg-primary p-2">
                <img
                    className="round-img my-1"
                    src={avatar}
                    alt=""
                />
                <h1 className="large">{name}</h1>
                <p className="lead">{status} {company && <span> at {company}</span>}</p>
                <p>{location && (<Fragment>{location}</Fragment>)}</p>
                <div className="icons my-1">
                    {website && (<Fragment>
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-globe fa-2x"></i>
                        </a>
                    </Fragment>)}
                    {social && (
                        <Fragment>
                            {social.twitter && (<Fragment>
                                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter fa-2x"></i>
                                </a>
                            </Fragment>)}
                            {social.facebook && (<Fragment>
                                <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook fa-2x"></i>
                                </a>
                            </Fragment>)}
                            {social.linkedin && (<Fragment>
                                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin fa-2x"></i>
                                </a>
                            </Fragment>)}
                            {social.youtube && (<Fragment>
                                <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-youtube fa-2x"></i>
                                </a>
                            </Fragment>)}
                            {social.instagram && (<Fragment>
                                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram fa-2x"></i>
                                </a>
                            </Fragment>)}
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop;