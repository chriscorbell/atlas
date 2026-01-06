---
title: "Foundation"
phase: "Phase 0"
weight: 0
---

Beginner-friendly, step-by-step guide to building a single-machine home server using:

- **Proxmox VE** as the bare-metal hypervisor
- **TrueNAS SCALE** VM as your NAS (ZFS + SMB)
- **Home Assistant OS** VM for smart home
- **Debian VM** as your Docker application host (Jellyfin, Immich, *arr stack, n8n, Ollama, etc.)

> **Last updated:** January 06, 2026

## Who this is for
- You want to self-host services at home.
- You’re comfortable with basic PC building and following terminal commands.
- You want a setup that can evolve: start small, then add GPU acceleration, reverse proxy, backups, and monitoring.

## What you’ll build
1. Pick hardware that matches your services (**GPU, RAM, storage, networking**)
2. Install Proxmox on bare metal
3. Run TrueNAS SCALE in a VM for ZFS-backed storage + SMB
4. Run Home Assistant OS in a VM with automated backups to NAS
5. Run Debian in a VM as your Docker host (optional GPU/iGPU passthrough)
6. Deploy Docker services (media, photos, automation, docs, web, etc.)
7. Secure remote access with Tailscale
8. Optional: domain + Cloudflare + Caddy reverse proxy
9. Optional: backup NAS + ZFS replication

## Recommended reading order
Start here:
- [Hardware Selection & Recommendations](01-hardware.md)
- [Installing Proxmox VE (Bare Metal)](02-proxmox-install.md)
- [TrueNAS SCALE VM on Proxmox (ZFS + SMB)](03-truenas-vm.md)
- [Home Assistant OS VM on Proxmox (Backups to NAS)](04-haos-vm.md)
- [Debian VM on Proxmox (GPU/iGPU Passthrough + SSH)](05-debian-vm-gpu-ssh.md)

Then continue through the Docker apps as you need them.

## Conventions used in examples
- Proxmox host: `pve`
- TrueNAS VM: `truenas`
- Home Assistant VM: `homeassistant`
- Debian VM: `debian-docker`
- ZFS pool: `tank`
- Mounts in Debian: `/mnt/nas/...`

## Safety + responsibility notes
- Keep management UIs (Proxmox/TrueNAS) **off the public internet**.
- Use strong passwords and 2FA.
- Use torrents and file acquisition tools **legally and responsibly**.

## Table of contents
See: [SUMMARY](SUMMARY.md)

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar


## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of `markdown-it` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :cry: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;) 😍

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
