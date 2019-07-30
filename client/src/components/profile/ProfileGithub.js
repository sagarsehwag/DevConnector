import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getGithubRepos } from "../../actions/profile";

import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
	useEffect(() => {
		getGithubRepos(username);
	}, [getGithubRepos, username]);

	return (
		<div className="">
			<h2 className="my-1">Github Repos</h2>
			{repos === null ? (
				<Spinner />
			) : (
				repos.map((repo) => {
					return (
						<div key={repos._id} className="p-3 my-2 bg-light rounded">
							<div>
								<h4>
									<a href={repo.html_url}>{repo.name}</a>
								</h4>
								<p>{repo.description}</p>
							</div>
							<div>
								<ul>
									<li className="badge badge-primary p-2 mx-1">
										Stars: {repo.stargazers_count}
									</li>
									<li className="badge badge-dark p-2 mx-1">
										Watchers: {repo.watchers_count}
									</li>
									<li className="badge badge-light p-2 mx-1">
										Forks: {repo.forks_count}
									</li>
								</ul>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

ProfileGithub.propTypes = {
	getGithubRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
	username: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
	return {
		repos: state.profile.repos
	};
};

export default connect(
	mapStateToProps,
	{ getGithubRepos }
)(ProfileGithub);
