import {buildApiRequest as A,getApiUrl as G} from '../utils/request'

export default {
    login: (p,c) => A(p,'user/login','post',c),
    articleIndexPage: (p,c)=>A(p,'/api/article/pages','post',c)

}


