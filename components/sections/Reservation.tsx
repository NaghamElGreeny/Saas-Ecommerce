// components/reservation-cta.tsx
import Link from 'next/link';
import { Button } from '../ui/Button';

interface ReservationProps {
    heading?: string;
    subheading?: string;
    buttonText?: string;
    reservationHref?: string;
    className?: string;
}

export function Reservation({
    heading = "Online Reservation",
    subheading = "Book a Table",
    buttonText = "Reserve Now",
    reservationHref = "/reservation",
    className = "",
}: ReservationProps) {
    return (
        <section className={`bg-white py-12 md:py-16 ${className}`}>
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {heading}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {subheading}
                    </p>
                    <div className="pt-6">
                        <Button variant="primary" size="lg" className="px-8">
                            <Link href={reservationHref}>
                                {buttonText}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}