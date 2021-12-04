import React,{useEffect} from "react";

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { PrismaClient } from ".prisma/client";
type RedirectProps = {

    url: string | null
}


export async function getServerSideProps(
    context: GetServerSidePropsContext<{ id: string }>,
): Promise<GetServerSidePropsResult<RedirectProps>> {
    const prisma = new PrismaClient();
    const id = context.params?.id;

    const record = await prisma.redirect.findFirst({
        where: {
            id,
        },
    });

    return {
        props: {
            url: record?.url || null,
        },
    };
}
export default function Redirect({ url }: RedirectProps) {
    if (!url) {
        return (

            <div >
                <h1 >404 :(</h1>

            </div>
        );
    }

    useEffect(() => {
        setTimeout(() => {
          window.location.href = url;
        }, 500);
      }, []);

    return (
        <div >
            <h1>Redirecting</h1>
        </div>
    );
}
