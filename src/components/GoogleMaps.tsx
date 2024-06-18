"use client"

import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { NextPage } from "next";
import { useState } from "react";
import Image from 'next/image'

type LocationInfoType = {
    name: string,
    location: {
        lat: number,
        lng: number
    },
    image: string
}

const mapContainerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: 10.762622,
    lng: 106.660172
};

const locations: LocationInfoType[] = [
    {
        name: "Địa điểm 1",
        location: { lat: 21.002980, lng: 105.810900 },
        image: "https://content.r9cdn.net/rimg/dimg/9f/f9/b80f2b97-city-34211-1648f9bdee7.jpg?width=1366&height=768&xhint=1744&yhint=910&crop=true"
    },
    {
        name: "Địa điểm 2",
        location: { lat: 10.776889, lng: 106.700806 },
        image: "https://via.placeholder.com/100"
    }
];

const GoogleMapWithMarkup: NextPage = () => {
    const [selected, setSelected] = useState<LocationInfoType | null>(null)
    return <div>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={5}
            >
                {locations.map((location: LocationInfoType, idx) => (
                    <Marker
                        key={idx}
                        position={location.location}
                        onMouseOver={() => setSelected(location)}
                    // onMouseOut={() => setSelected(null)}
                    />
                ))}
                {selected ? (
                    <InfoWindow
                        position={selected.location}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div>
                            <h2 className="color-black" style={{
                                color: 'black'
                            }}>{selected.name + "Hello"}</h2>
                            <img src={selected.image} alt={selected.name} style={{ width: '100%', height: '100px' }} width={100} height={200} />
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </LoadScript>
    </div>
}

export default GoogleMapWithMarkup