import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	SafeAreaView, 
	ScrollView,
} from 'react-native';
import {
	Layout,
	Input,
	Text,
	Button,
	Icon,
    Card
} from '@ui-kitten/components';

const LoginForm = ({authNavigation}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailErr, setEmailErr] = useState('basic');
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const eyeIcon = (props) => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
		</TouchableWithoutFeedback>
	);

	const AlertIcon = (props) => (
		<Icon {...props} name='alert-circle-outline'/>
	);

    const labelStyle = (name) => (
        <Text style={styles.label} category='h6'>{name}</Text>
    )

    const cardHeader = () => (
        <Text style={styles.title}>Login</Text>
    )

	const validateEmail = (newEmail) => {
		setEmail(newEmail);
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(String(newEmail).toLowerCase())){
			setEmailErr('success');
		}
		else{
			setEmailErr('danger');
		}
	}

	return (
		<Layout style={{ flex: 1, backgroundColor: "#CBF6E0" }}>
			<SafeAreaView>
				<ScrollView 
					showsVerticalScrollIndicator = {false}
				>
					<Image
						style={styles.tinyLogo}
						source={require('./../../assets/logo.png')}
					/>
					<Card 
						style={styles.container}
						header={cardHeader}
					>
						<Input
							style={styles.inputElements}
							value={email}
							size={'large'}
							label="Email"
							placeholder={'Enter email'}
							onChangeText={(newEmail) => validateEmail(newEmail)}
							status={emailErr}
						/>
						<Input
							style={styles.inputElements}
							value={password}
							size={'large'}
							label="Password"
							placeholder={'Enter password'}
							onChangeText={(pass) => setPassword(pass)}
							accessoryRight={eyeIcon}
							secureTextEntry={secureTextEntry}
							caption= {'Should contain at least 8 characters'}
							captionIcon={AlertIcon}
						/>
						<TouchableWithoutFeedback>
							<Text 
								style={styles.ghostButton}
							>Forgot password?</Text>
						</TouchableWithoutFeedback>
						<Button style={styles.inputElements}>
							Log in
						</Button>
						<TouchableWithoutFeedback
							onPress={() => authNavigation.navigate('Register')}
						>
							<Text
								style={styles.ghostButton}
							>Not a member? Sign Up</Text>
						</TouchableWithoutFeedback>
					</Card>
				</ScrollView>
			</SafeAreaView>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 15,
		justifyContent: 'center',
	},
	inputElements: {
		marginTop: 20,
	},
	title: {
		alignSelf: 'center',
		fontSize: 18,
		fontFamily: 'Montserrat-Bold',
		marginVertical: 10,
		color: '#111344',
	},
	ghostButton: {
		alignSelf: 'center',
		fontWeight: 'bold',
		color: '#22BF6E',
		marginTop: 5,
	},
	tinyLogo: {
		width: 250,
		height: 250,
		alignSelf: 'center',
	},
});

export default LoginForm;