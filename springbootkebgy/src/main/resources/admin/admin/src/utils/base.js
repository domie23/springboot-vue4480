const base = {
    get() {
        return {
            url : "http://localhost:8080/springbootkebgy/",
            name: "springbootkebgy",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springbootkebgy/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于vue全家桶的pc端仿淘宝系统"
        } 
    }
}
export default base
