import {
	WLAuthorizationManager,
	WLResourceRequest,
	WLClient,
} from 'react-native-ibm-mobilefirst';

let MFP_SERVER_URL = 'https://mfp.eadi.asia:443/mfp';

WLClient.setServerUrl(MFP_SERVER_URL);
WLClient.getServerUrl().then(
	url => __DEV__ && console.log('current MFP env: ', url)
);

const DEFAULT_SCOPE = 'RegisteredClient';

export async function obtainAccessToken(scope = DEFAULT_SCOPE, allowRetry = 5) {
	__DEV__ && console.log('obtain mfp token')
	try {
		await WLAuthorizationManager.obtainAccessToken(scope);
	} catch (err) {
		__DEV__ && console.log(err);
		if (allowRetry > 0) {
			return await obtainAccessToken(scope, allowRetry - 1);
		}
	}
}

