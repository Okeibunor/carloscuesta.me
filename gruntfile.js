module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-pagespeed');

    grunt.initConfig({
        pagespeed: {
            options: {
                nokey: true,
                url: "http://carloscuesta.me",
                locale: "en_GB",
                threshold: 99
            },
            desktop: {
                options: {
                    strategy: "desktop"
                }
            },
            mobile: {
                options: {
                    strategy: "mobile"
                }
            }
        }
    });

    grunt.registerTask('default', function() {
        grunt.task.run('pagespeed');
    });
};
