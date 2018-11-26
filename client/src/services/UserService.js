
export default class UserService {

	checkRole(role) {
		return (JSON.parse(sessionStorage.getItem('user')))
			.role.title === role
	}
}