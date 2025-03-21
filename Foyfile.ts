import { task, desc, option, fs, logger, setGlobalOptions } from 'foy'

setGlobalOptions({ spinner: false })

const PerfResult= {
  vite: 0,
  viteNativePlugin: 0,
  esbuild: 0,
  rsbuild: 0,
}

task('vite', async (ctx) => {
  let now = performance.now()
  await ctx.exec('vite build')
  PerfResult.vite = performance.now() - now
})

task('vite:enableNativePlugin', async (ctx) => {
  let now = performance.now()
  await ctx.env('enableNativePlugin=true').exec('vite build')
  PerfResult.viteNativePlugin = performance.now() - now
})

task('esbuild', async (ctx) => {
  let now = performance.now()
  await ctx.exec(
    'esbuild src/index.tsx --bundle --minify --sourcemap --platform=browser --target=esnext --outdir=dist/esbuild'
  )
  PerfResult.esbuild = performance.now() - now
})

task('rsbuild', async ctx => {
  let now = performance.now()
  await ctx.exec('rsbuild build')
  PerfResult.rsbuild = performance.now() - now
})

task('perf', ['vite', 'vite:enableNativePlugin', 'esbuild', 'rsbuild'], async ctx => {
  function formatTime(time: number) {
    return (time / 1000).toFixed(2) + 's'
  }
  logger.info(`vite: ${formatTime(PerfResult.vite)}`)
  logger.info(`viteNativePlugin: ${formatTime(PerfResult.viteNativePlugin)}`)
  logger.info(`esbuild: ${formatTime(PerfResult.esbuild)}`)
  logger.info(`rsbuild: ${formatTime(PerfResult.rsbuild)}`)
})
