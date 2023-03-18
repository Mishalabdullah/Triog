import { useMemo } from "react"
import { BlogProvider } from "src/context/Blog"
import { Router } from "src/router"
import { ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import "./App.css"


export const App = () => {
const endpoint ="https://cold-stylish-pond.solana-devnet.discover.quiknode.pro/63fda65b3af2d9e4bfbb159b1511592662429d54/"
const wallets = useMemo(
  () => [
    new PhantomWalletAdapter(),
  ],
  []
)
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}autoConnect>
        <BlogProvider>
          <Router />
        </BlogProvider>
      </WalletProvider>
    </ConnectionProvider>

  )
}
