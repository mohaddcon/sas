import Header from "@/components/header";
import Footer from "@/components/footer";
import ReduxProvider from "@/providers/ReduxProvider";
import { Directions, Languages } from "@/constants/enums";
import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import { Locale } from "@/i18n.config";
import { Toaster } from "@/components/ui/toaster";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import Sidebar from "@/components/sas/Sidebar";



const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	preload: true,
});

const cairo = Cairo({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	preload: true,
});

export const metadata: Metadata = {
	title: "sas-app",
	description: "SAS section",
};

export default async function sasLayout({
	params,
	children,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: Locale }>;
}>) {
	const locale = (await params).locale;
	return (
		<html
			lang={locale}
			dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
		>
			<body className={locale === Languages.ARABIC ? cairo.className : roboto.className}>
				
						<div className="flex">
							<Sidebar/>
							<main className="flex-1">{children}</main>

							
						</div>
						
			</body>
		</html>
	);
}

