#!/usr/bin/env bun

import { $ } from 'bun'
import * as fs from 'node:fs/promises'

var s = await $`ls`.text()
var l = s.split('\n').filter(v => !v.startsWith('_') && v.endsWith('.tengo'))
for (var i = 0; i < l.length; i++) {
    l[i] = (await $`cat ${l[i]}`.text()).replaceAll('import("brook")', 'undefined')
}
s = l.join('\n')

await fs.writeFile('/tmp/_.tengo', `
in_brooklinks := undefined
in_dnsquery := undefined
in_address := undefined
in_httprequest := undefined
in_httpresponse := undefined
${s}
`)
await $`tengo /tmp/_.tengo`
