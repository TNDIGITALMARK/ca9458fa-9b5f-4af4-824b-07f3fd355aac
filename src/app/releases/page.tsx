"use client";

import * as React from "react";
import { MusicNavigation } from "@/components/music-navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Music,
  Upload,
  Plus,
  X,
  Calendar,
  Globe,
  Share,
  Settings,
  FileAudio,
  Image as ImageIcon,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Play
} from "lucide-react";

// Mock data for existing releases
const existingReleases = [
  {
    id: 1,
    title: "Summer Nights EP",
    artist: "Jane Smith",
    status: "published",
    releaseDate: "2024-03-15",
    tracks: ["Sunset Boulevard", "Midnight Drive", "City Lights", "Dawn Break"],
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music"],
    totalStreams: "125.4K",
    coverArt: "/covers/summer-nights.jpg",
    distributionStatus: {
      spotify: "live",
      appleMusic: "live",
      youtubeMusic: "live",
      amazonMusic: "live"
    },
    preOrderDate: null
  },
  {
    id: 2,
    title: "Midnight Drive (Single)",
    artist: "Jane Smith",
    status: "pending",
    releaseDate: "2024-03-28",
    tracks: ["Midnight Drive"],
    platforms: ["Spotify", "Apple Music", "Amazon Music"],
    totalStreams: "0",
    coverArt: "/covers/midnight-drive.jpg",
    distributionStatus: {
      spotify: "processing",
      appleMusic: "processing",
      amazonMusic: "processing"
    },
    preOrderDate: "2024-03-25"
  },
  {
    id: 3,
    title: "Acoustic Sessions Vol. 1",
    artist: "Jane Smith",
    status: "draft",
    releaseDate: "2024-04-10",
    tracks: ["Unplugged Version", "Coffee Shop Blues", "Rain on Windows"],
    platforms: [],
    totalStreams: "0",
    coverArt: null,
    distributionStatus: {},
    preOrderDate: null
  }
];

const platformOptions = [
  { id: "spotify", name: "Spotify", icon: "🎵", required: true },
  { id: "appleMusic", name: "Apple Music", icon: "🍎", required: true },
  { id: "youtubeMusic", name: "YouTube Music", icon: "📺", required: false },
  { id: "amazonMusic", name: "Amazon Music", icon: "🛒", required: false },
  { id: "deezer", name: "Deezer", icon: "🎧", required: false },
  { id: "tidal", name: "Tidal", icon: "🌊", required: false }
];

const genreOptions = [
  "Pop", "Rock", "Hip Hop", "Electronic", "Jazz", "Classical", "Country",
  "R&B", "Folk", "Reggae", "Blues", "Alternative", "Indie", "Metal"
];

function ReleaseCard({ release }: { release: typeof existingReleases[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'status-published';
      case 'pending': return 'status-pending';
      case 'draft': return 'status-draft';
      default: return 'status-draft';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      default: return <Edit className="h-4 w-4" />;
    }
  };

  return (
    <Card className="music-card">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
            {release.coverArt ? (
              <div className="w-full h-full bg-accent/20 rounded-lg flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-accent" />
              </div>
            ) : (
              <Music className="h-8 w-8 text-muted-foreground" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg text-foreground">{release.title}</h3>
                <p className="text-muted-foreground">{release.artist}</p>
                <p className="text-sm text-muted-foreground">
                  {release.tracks.length} track{release.tracks.length !== 1 ? 's' : ''} •
                  Release: {new Date(release.releaseDate).toLocaleDateString()}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <Badge className={`${getStatusColor(release.status)} flex items-center space-x-1`}>
                {getStatusIcon(release.status)}
                <span className="capitalize">{release.status}</span>
              </Badge>
              {release.totalStreams !== "0" && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Play className="h-3 w-3" />
                  <span>{release.totalStreams} streams</span>
                </div>
              )}
            </div>

            {release.platforms.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Available on:</p>
                <div className="flex flex-wrap gap-2">
                  {release.platforms.map((platform) => (
                    <Badge key={platform} variant="outline" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline">
                <Copy className="h-3 w-3 mr-1" />
                Duplicate
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function NewReleaseForm() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    title: "",
    artist: "Jane Smith",
    releaseType: "single",
    primaryGenre: "",
    secondaryGenre: "",
    releaseDate: "",
    preOrderDate: "",
    description: "",
    platforms: [] as string[],
    tracks: [] as { title: string; duration: string; file: File | null; isrc: string }[],
    coverArt: null as File | null,
    splitSheets: false,
    publishingAdmin: false,
    syncLicensing: true,
    previewCampaign: false
  });

  const steps = [
    { title: "Basic Info", description: "Release details and metadata" },
    { title: "Tracks", description: "Upload and configure tracks" },
    { title: "Cover Art", description: "1400x1400px artwork" },
    { title: "Platforms", description: "Distribution settings" },
    { title: "Advanced", description: "Publishing & licensing" },
    { title: "Review", description: "Submit for review" }
  ];

  const addTrack = () => {
    setFormData(prev => ({
      ...prev,
      tracks: [...prev.tracks, { title: "", duration: "", file: null, isrc: "" }]
    }));
  };

  const removeTrack = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks.filter((_, i) => i !== index)
    }));
  };

  const updateTrack = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      tracks: prev.tracks.map((track, i) =>
        i === index ? { ...track, [field]: value } : track
      )
    }));
  };

  const togglePlatform = (platformId: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
        </div>
        <Progress value={((currentStep + 1) / steps.length) * 100} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center p-2 rounded ${
                index === currentStep
                  ? 'bg-accent text-white'
                  : index < currentStep
                    ? 'bg-green-100 text-green-800'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              <div className="font-medium">{step.title}</div>
              <div className="opacity-75">{step.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="music-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Music className="h-5 w-5" />
            <span>{steps[currentStep].title}</span>
          </CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Step 0: Basic Info */}
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Release Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter release title"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="artist">Primary Artist *</Label>
                  <Input
                    id="artist"
                    value={formData.artist}
                    onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Release Type *</Label>
                  <RadioGroup
                    value={formData.releaseType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, releaseType: value }))}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single">Single</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ep" id="ep" />
                      <Label htmlFor="ep">EP (2-6 tracks)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="album" id="album" />
                      <Label htmlFor="album">Album (7+ tracks)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="primaryGenre">Primary Genre *</Label>
                  <Select value={formData.primaryGenre} onValueChange={(value) => setFormData(prev => ({ ...prev, primaryGenre: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select primary genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genreOptions.map((genre) => (
                        <SelectItem key={genre} value={genre.toLowerCase()}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="secondaryGenre">Secondary Genre</Label>
                  <Select value={formData.secondaryGenre} onValueChange={(value) => setFormData(prev => ({ ...prev, secondaryGenre: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select secondary genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genreOptions.map((genre) => (
                        <SelectItem key={genre} value={genre.toLowerCase()}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="releaseDate">Release Date *</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
                    className="mt-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="preOrderDate">Pre-order Date (Optional)</Label>
                  <Input
                    id="preOrderDate"
                    type="date"
                    value={formData.preOrderDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, preOrderDate: e.target.value }))}
                    className="mt-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Release Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your release..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Step 1: Tracks */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Track List</h3>
                  <p className="text-sm text-muted-foreground">Upload high-quality audio files (WAV/FLAC preferred)</p>
                </div>
                <Button onClick={addTrack} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Track
                </Button>
              </div>

              {formData.tracks.map((track, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2">
                      <Label>Track Title *</Label>
                      <Input
                        value={track.title}
                        onChange={(e) => updateTrack(index, 'title', e.target.value)}
                        placeholder="Enter track title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input
                        value={track.duration}
                        onChange={(e) => updateTrack(index, 'duration', e.target.value)}
                        placeholder="3:24"
                        className="mt-1"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'audio/*';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) updateTrack(index, 'file', file);
                          };
                          input.click();
                        }}
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        {track.file ? 'Replace' : 'Upload'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTrack(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {track.file && (
                    <div className="mt-3 flex items-center space-x-2 text-sm text-muted-foreground">
                      <FileAudio className="h-4 w-4" />
                      <span>{track.file.name}</span>
                    </div>
                  )}
                  <div className="mt-3">
                    <Label>ISRC Code (Optional)</Label>
                    <Input
                      value={track.isrc}
                      onChange={(e) => updateTrack(index, 'isrc', e.target.value)}
                      placeholder="US-XXX-XX-XXXXX"
                      className="mt-1"
                    />
                  </div>
                </Card>
              ))}

              {formData.tracks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tracks added yet</p>
                  <Button onClick={addTrack} className="mt-2">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Your First Track
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Cover Art */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Album Cover</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a high-quality image (1400x1400px minimum, JPG/PNG format)
                </p>

                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  {formData.coverArt ? (
                    <div className="space-y-4">
                      <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{formData.coverArt.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(formData.coverArt.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setFormData(prev => ({ ...prev, coverArt: null }))}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <Button
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) setFormData(prev => ({ ...prev, coverArt: file }));
                            };
                            input.click();
                          }}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Cover Art
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                          Or drag and drop your image here
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-800">Cover Art Requirements:</p>
                      <ul className="text-blue-700 mt-1 space-y-1">
                        <li>• Minimum 1400x1400px (square format)</li>
                        <li>• Maximum 100MB file size</li>
                        <li>• JPG or PNG format</li>
                        <li>• No promotional text or timestamps</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Platforms */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Distribution Platforms</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select which platforms you want to distribute your music to
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platformOptions.map((platform) => (
                    <div
                      key={platform.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.platforms.includes(platform.id)
                          ? 'border-accent bg-accent/5'
                          : 'border-border'
                      }`}
                      onClick={() => togglePlatform(platform.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={formData.platforms.includes(platform.id)}
                          onChange={() => togglePlatform(platform.id)}
                        />
                        <div className="text-2xl">{platform.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{platform.name}</h4>
                            {platform.required && (
                              <Badge variant="secondary" className="text-xs">Required</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-800">Distribution Timeline:</p>
                    <ul className="text-green-700 mt-1 space-y-1">
                      <li>• Major platforms: 1-7 business days</li>
                      <li>• Smaller platforms: 2-14 business days</li>
                      <li>• Pre-order releases: Setup 4+ weeks in advance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Advanced */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Publishing Administration & Licensing</h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={formData.publishingAdmin}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, publishingAdmin: !!checked }))}
                      id="publishing"
                    />
                    <Label htmlFor="publishing" className="flex-1">
                      <div className="font-medium">Publishing Administration</div>
                      <div className="text-sm text-muted-foreground">
                        Collect mechanical royalties and manage publishing rights
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={formData.splitSheets}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, splitSheets: !!checked }))}
                      id="splits"
                    />
                    <Label htmlFor="splits" className="flex-1">
                      <div className="font-medium">Split Sheet Management</div>
                      <div className="text-sm text-muted-foreground">
                        Manage songwriter and producer splits automatically
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={formData.syncLicensing}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, syncLicensing: !!checked }))}
                      id="sync"
                    />
                    <Label htmlFor="sync" className="flex-1">
                      <div className="font-medium">Sync Licensing</div>
                      <div className="text-sm text-muted-foreground">
                        Make your music available for TV, film, and advertising
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={formData.previewCampaign}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, previewCampaign: !!checked }))}
                      id="presave"
                    />
                    <Label htmlFor="presave" className="flex-1">
                      <div className="font-medium">Pre-save Campaigns</div>
                      <div className="text-sm text-muted-foreground">
                        Enable pre-save links for Spotify and Apple Music
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Review Your Release</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">RELEASE DETAILS</h4>
                      <div className="mt-2">
                        <p className="font-medium">{formData.title || "Untitled Release"}</p>
                        <p className="text-sm text-muted-foreground">{formData.artist}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {formData.releaseType} • {formData.primaryGenre}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">TRACKS ({formData.tracks.length})</h4>
                      <div className="mt-2 space-y-1">
                        {formData.tracks.map((track, index) => (
                          <div key={index} className="text-sm">
                            {index + 1}. {track.title || "Untitled"}
                            {track.duration && ` (${track.duration})`}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">PLATFORMS ({formData.platforms.length})</h4>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {formData.platforms.map((platformId) => {
                          const platform = platformOptions.find(p => p.id === platformId);
                          return platform ? (
                            <Badge key={platformId} variant="outline" className="text-xs">
                              {platform.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">DATES</h4>
                      <div className="mt-2 text-sm">
                        {formData.preOrderDate && (
                          <p>Pre-order: {new Date(formData.preOrderDate).toLocaleDateString()}</p>
                        )}
                        <p>Release: {formData.releaseDate ? new Date(formData.releaseDate).toLocaleDateString() : "Not set"}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">SERVICES</h4>
                      <div className="mt-2 text-sm space-y-1">
                        {formData.publishingAdmin && <p>✓ Publishing Administration</p>}
                        {formData.splitSheets && <p>✓ Split Sheet Management</p>}
                        {formData.syncLicensing && <p>✓ Sync Licensing</p>}
                        {formData.previewCampaign && <p>✓ Pre-save Campaigns</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button className="bg-accent hover:bg-accent/90">
            Submit for Review
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            className="bg-accent hover:bg-accent/90"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}

export default function ReleasesPage() {
  const [activeTab, setActiveTab] = React.useState("releases");
  const [showNewReleaseForm, setShowNewReleaseForm] = React.useState(false);

  return (
    <MusicNavigation>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Release Manager</h1>
            <p className="text-muted-foreground">
              Upload, configure, and distribute your music releases
            </p>
          </div>
          <Button
            onClick={() => setShowNewReleaseForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Release</span>
          </Button>
        </div>

        {/* New Release Form Modal */}
        <Dialog open={showNewReleaseForm} onOpenChange={setShowNewReleaseForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Music className="h-5 w-5" />
                <span>Create New Release</span>
              </DialogTitle>
              <DialogDescription>
                Follow the steps to upload and configure your music release
              </DialogDescription>
            </DialogHeader>
            <NewReleaseForm />
          </DialogContent>
        </Dialog>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="releases">All Releases</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="releases" className="space-y-4">
            <div className="grid gap-6">
              {existingReleases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            <div className="grid gap-6">
              {existingReleases.filter(r => r.status === 'draft').map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
            {existingReleases.filter(r => r.status === 'draft').length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No draft releases</p>
                <Button
                  className="mt-4"
                  onClick={() => setShowNewReleaseForm(true)}
                >
                  Create Your First Release
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="music-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                      <Music className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Releases</p>
                      <p className="text-2xl font-bold">{existingReleases.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="music-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Published</p>
                      <p className="text-2xl font-bold">
                        {existingReleases.filter(r => r.status === 'published').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="music-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">
                        {existingReleases.filter(r => r.status === 'pending').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MusicNavigation>
  );
}