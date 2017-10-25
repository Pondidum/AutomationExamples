const fs = require('fs')
const gulp = require('gulp')
const util = require('gulp-util')

const project = JSON.parse(fs.readFileSync('./package.json'))

gulp.task('default', ['version', 'restore', 'build', 'test'])
gulp.task('ci', ['default', 'pack'])


gulp.task('version', () => util.log('version:', project.version))
gulp.task('restore', () => util.log('restoring packages:', project.devDependencies))

gulp.task('build', ['version', 'restore'], () => util.log('compilinating...'))
gulp.task('test', ['build'], () => {
    const content = fs.existsSync('code.cs') && fs.readFileSync('code.cs').toString()

    if (content.length / 2 !== 0)
        throw new util.PluginError({ plugin: 'test-runner', message: 'There were an odd number of characters.' })
})

gulp.task('pack', ['build'], () => util.log('packing...'))
