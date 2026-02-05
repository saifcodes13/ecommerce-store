import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
	const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: true, // on development mode i was running on "process.env.NODE_ENV !== "development""
		sameSite: 'none', // on development mode i was running on "strict" mode
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
};

export default generateToken;
