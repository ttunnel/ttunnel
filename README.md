# ttunnel

ttunnel exposes your localhost to the world for testing and sharing! No need to mess with DNS or those hard networking staff.

> ttunnel can expose ony hostname other than localhost, for example it is suitable for sharing valet sites.

## Installation


### Globally

```sh
npm install -g ttunnel
```

### As a dev dependency in your project

```sh
npm install -D ttunnel
```

## Quickstart

```sh
npx ttunnel start 8080
```

### Common Issues


#### Node Version

> **ttunnel requires node version greater than or equal 20**, due to [resolving localhost issue](https://github.com/nodejs/node/issues/40702)

#### Invalid Host Header

> If you are trying to tunneling Vue, React or any other frameworks, sometimes it requires Host header to be presented in the request headers. To solve this common issue through ttunnel, run the following command:

```sh
npx ttunnel start 8080 --host-header=localhost:8080
```

### Restart your tunnel

Sometimes you want to make changes to your codebase, most of times this requires to close the tunnel, but don't worry about restarting the tunnel with the same domain. You just need to remember the domain, or customize it from the beginning.

```sh
npx ttunnel start 8080 --domain=my-awesome-subdomain
```

### Arguments & Flags

- `port` (argument)(number) [required] The local port number to expose through.
- `domain` (flag)(string) Request a specific subdomain on the proxy server. **Note** You may not actually receive this name depending on availability.
- `endpoint` (flag)(string) URL for the proxy server.
- `hostname` (flag)(string) Proxy to this hostname instead of `localhost`. In most cases `host-header` flag must be presented.
- `host-header` (flag)(string)

Run `npx ttunnel help` command to learn more about ttunnel available commands and arguments.
