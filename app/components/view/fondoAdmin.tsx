import React from 'react'

export default function FondoAdmin({ children }: React.PropsWithChildren) {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center">
            {children}
        </section>
    )
}
