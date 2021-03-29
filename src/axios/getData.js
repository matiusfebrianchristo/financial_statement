import { http } from '@/axios';
// import { mapGetters } from 'vuex';

const token = 'bearer ' + this.$store.getters.token;
const header = process.env.token;

export default{
    getDataYear(url){
        http(url, header)

    }
}