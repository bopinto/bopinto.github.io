const sass = require("sass");

module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        options: {
          style: "compressed"
        },
        files: {
          "css/style.css": "scss/main.scss",
          "css/noscript.css": "scss/noscript.scss"
        }
      }
    },
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "css",
            src: ["*.css", "!*.min.css"],
            dest: "css",
            ext: ".min.css"
          }
        ]
      }
    },
    watch: {
      css: {
        files: "**/*.scss",
        tasks: ["sass", "cssmin"]
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: "*"
        }
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  grunt.registerTask("dev-server", ["connect", "watch"]);
  grunt.registerTask("default", ["sass", "cssmin"]);
};
