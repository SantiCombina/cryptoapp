export function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="min-w-screen">
            <div className="container flex w-full mx-auto">{children}</div>
        </div>
    );
}
