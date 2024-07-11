// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type {AxiosHeaders, AxiosResponse} from 'axios';

export declare type TClientResponse<T> = {
    response?: Response;
    status: AxiosResponse['status'];
    headers: AxiosHeaders;
    data: T;
};
